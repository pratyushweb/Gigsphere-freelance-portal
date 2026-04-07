import { query } from '../config/db.js';

export const createReview = async (req, res, next) => {
  try {
    const { contract_id, reviewee_id, rating, comment } = req.body;

    const result = await query(
      `INSERT INTO reviews (contract_id, reviewer_id, reviewee_id, rating, comment) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [contract_id, req.user.id, reviewee_id, rating, comment]
    );

    // Update user average rating
    await query(`
      UPDATE users SET avg_rating = (
        SELECT ROUND(AVG(rating), 2) FROM reviews WHERE reviewee_id = $1
      ) WHERE id = $1
    `, [reviewee_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await query(
      `SELECT r.*, json_build_object('id', u.id, 'name', u.full_name, 'avatar_url', u.avatar_url) as reviewer
       FROM reviews r
       JOIN users u ON r.reviewer_id = u.id
       WHERE r.reviewee_id = $1
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
