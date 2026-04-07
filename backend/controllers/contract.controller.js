import { query } from '../config/db.js';
import { stripe } from '../config/stripe.js';

export const hireFreelancer = async (req, res, next) => {
  try {
    const { gig_id, freelancer_id, proposal_id } = req.body;
    const client_id = req.user.id;

    // 1. Verify proposal exists and belongs to this gig
    const proposalRes = await query('SELECT bid_amount, status FROM proposals WHERE id = $1 AND gig_id = $2', [proposal_id, gig_id]);
    if (proposalRes.rows.length === 0) {
      return res.status(404).json({ error: 'Valid proposal not found' });
    }

    const amount = proposalRes.rows[0].bid_amount;

    // 2. Create Contract
    const contractRes = await query(
      `INSERT INTO contracts (gig_id, client_id, freelancer_id, proposal_id, amount) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [gig_id, client_id, freelancer_id, proposal_id, amount]
    );
    const contractId = contractRes.rows[0].id;

    // 3. Update Proposal Status
    await query(`UPDATE proposals SET status = 'accepted' WHERE id = $1`, [proposal_id]);
    await query(`UPDATE gigs SET status = 'in_progress' WHERE id = $1`, [gig_id]);

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `GigSphere Contract - Escrow Hold`,
            description: `Payment for contract ${contractId}`,
          },
          unit_amount: Math.round(amount * 100), // Stripe expects cents
        },
        quantity: 1,
      }],
      metadata: {
        contract_id: contractId
      },
      success_url: `${process.env.CLIENT_URL}/dashboard/client?payment_success=true`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/client/proposals?payment_cancel=true`,
    });

    // 5. Create Payment record in 'pending' state
    await query(
      `INSERT INTO payments (contract_id, stripe_session_id, amount, status) 
       VALUES ($1, $2, $3, 'pending')`,
      [contractId, session.id, amount]
    );

    res.status(201).json({
      message: 'Contract created. Proceed to payment to activate.',
      contractId,
      checkoutUrl: session.url
    });
  } catch (error) {
    next(error);
  }
};

export const updateContractStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., 'completed'

    const result = await query(
      `UPDATE contracts SET status = $1 WHERE id = $2 AND client_id = $3 RETURNING *`,
      [status, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contract not found or not authorized' });
    }

    // If completed, release funds conceptually
    if (status === 'completed') {
       await query(`UPDATE payments SET status = 'released' WHERE contract_id = $1`, [id]);
       // Update gig status
       const gigId = result.rows[0].gig_id;
       await query(`UPDATE gigs SET status = 'completed' WHERE id = $1`, [gigId]);
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
