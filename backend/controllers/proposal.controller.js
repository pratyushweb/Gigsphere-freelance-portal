import { query } from '../config/db.js';
import { rankProposal } from '../services/ai.service.js';

export const submitProposal = async (req, res, next) => {
  try {
    const { gig_id, cover_letter, bid_amount, delivery_days } = req.body;
    const freelancerId = req.user.id;

    // 1. Check if gig exists
    const gigResult = await query('SELECT * FROM gigs WHERE id = $1', [gig_id]);
    if (gigResult.rows.length === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    const gig = gigResult.rows[0];

    // 2. Fetch freelancer profile for AI analysis
    const freelancerResult = await query('SELECT bio, skills FROM users WHERE id = $1', [freelancerId]);
    const freelancer = freelancerResult.rows[0];

    // 3. Insert temp proposal to ensure no duplicates
    // Using ON CONFLICT to avoid race conditions requires a constraint, we have UNIQUE(gig_id, freelancer_id)
    let newProposal;
    try {
       const initialInsert = await query(
        `INSERT INTO proposals (gig_id, freelancer_id, cover_letter, bid_amount, delivery_days) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [gig_id, freelancerId, cover_letter, bid_amount, delivery_days]
      );
      newProposal = initialInsert.rows[0];
    } catch (err) {
      if (err.code === '23505') { // Postgres unique violation error code
        return res.status(400).json({ error: 'You have already submitted a proposal for this gig.' });
      }
      throw err;
    }

    // 4. Run AI Ranking asynchronously (don't block the initial return if it takes too long, but for prototype we wait)
    const { score, analysis } = await rankProposal(
       gig, 
       freelancer, 
       { cover_letter }
    );

    // 5. Update proposal with AI score
    const finalResult = await query(
      `UPDATE proposals 
       SET ai_rank_score = $1, ai_analysis = $2 
       WHERE id = $3 RETURNING *`,
      [score, analysis, newProposal.id]
    );

    res.status(201).json(finalResult.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getGigProposals = async (req, res, next) => {
  try {
    const { gigId } = req.params;

    // Verify user is the client of this gig
    const gigResult = await query('SELECT client_id FROM gigs WHERE id = $1', [gigId]);
    
    if (gigResult.rows.length === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    if (gigResult.rows[0].client_id !== req.user.id) {
       return res.status(403).json({ error: 'Unauthorized to view these proposals' });
    }

    // Fetch proposals ordered by AI score descending
    const result = await query(
      `SELECT p.*, json_build_object('id', u.id, 'name', u.full_name, 'rating', u.avg_rating, 'avatar_url', u.avatar_url) as freelancer
       FROM proposals p
       JOIN users u ON p.freelancer_id = u.id
       WHERE p.gig_id = $1
       ORDER BY p.ai_rank_score DESC NULLS LAST`,
      [gigId]
    );

    // Mark top 3 conceptually
    const proposals = result.rows.map((p, index) => ({
       ...p,
       ai_badge: index < 3 && p.ai_rank_score > 80 ? 'Top Match' : (p.ai_rank_score > 60 ? 'Good Fit' : 'Average')
    }));

    res.json(proposals);
  } catch (error) {
    next(error);
  }
};

export const getMyProposals = async (req, res, next) => {
  try {
    const freelancerId = req.user.id;

    const result = await query(
      `SELECT p.*, json_build_object('id', g.id, 'title', g.title, 'budget', g.budget, 'status', g.status) as gig
       FROM proposals p
       JOIN gigs g ON p.gig_id = g.id
       WHERE p.freelancer_id = $1
       ORDER BY p.created_at DESC`,
      [freelancerId]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
