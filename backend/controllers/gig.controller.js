import { query } from '../config/db.js';

export const createGig = async (req, res, next) => {
  try {
    const { title, description, skills_required, budget, deadline } = req.body;

    const result = await query(
      `INSERT INTO gigs (client_id, title, description, skills_required, budget, deadline) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [req.user.id, title, description, skills_required, budget, deadline]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  try {
    const { search, category, skills, min_budget, max_budget, status = 'open' } = req.query;
    
    let sql = `
      SELECT g.*, 
             json_build_object('id', u.id, 'name', u.full_name, 'rating', u.avg_rating, 'avatar_url', u.avatar_url) as client
      FROM gigs g
      JOIN users u ON g.client_id = u.id
      WHERE g.status = $1
    `;
    const params = [status];
    let paramIndex = 2;

    if (search) {
      sql += ` AND (g.title ILIKE $${paramIndex} OR g.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (category) {
      // Map category to skills check or specific category column if added later
      // For now we check if any skill matches the category name
      sql += ` AND g.skills_required @> $${paramIndex}::text[]`;
      params.push([category]);
      paramIndex++;
    }

    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
      sql += ` AND g.skills_required && $${paramIndex}`;
      params.push(skillsArray);
      paramIndex++;
    }

    if (min_budget) {
      sql += ` AND g.budget >= $${paramIndex}`;
      params.push(min_budget);
      paramIndex++;
    }

    if (max_budget) {
      sql += ` AND g.budget <= $${paramIndex}`;
      params.push(max_budget);
      paramIndex++;
    }

    sql += ` ORDER BY g.created_at DESC`;

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getGigById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT g.*, json_build_object('id', u.id, 'name', u.full_name, 'rating', u.avg_rating, 'avatar_url', u.avatar_url) as client
       FROM gigs g
       JOIN users u ON g.client_id = u.id
       WHERE g.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
