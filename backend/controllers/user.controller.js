import { query } from '../config/db.js';

export const getProfile = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, email, role, full_name, bio, skills, avatar_url, avg_rating, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { full_name, bio, skills, avatar_url } = req.body;

    const result = await query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name), 
           bio = COALESCE($2, bio), 
           skills = COALESCE($3, skills), 
           avatar_url = COALESCE($4, avatar_url)
       WHERE id = $5 
       RETURNING id, email, role, full_name, bio, skills, avatar_url, avg_rating`,
      [full_name, bio, skills, avatar_url, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT id, role, full_name, bio, skills, avatar_url, avg_rating, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
