import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, role, full_name } = req.body;

    // Check if user exists
    const userExists = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await query(
      `INSERT INTO users (email, password_hash, role, full_name) 
       VALUES ($1, $2, $3, $4) RETURNING id, email, role, full_name, created_at`,
      [email, passwordHash, role, full_name]
    );

    const user = result.rows[0];

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`🔍 Login attempt for: ${email}`);

    // Find user
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      console.log(`❌ No user found with email: ${email}`);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    console.log(`✅ User found: ${user.full_name} (${user.role})`);

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      console.log(`❌ Password mismatch for: ${email}`);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log(`🎉 Login successful for: ${email}`);
    // Remove password_hash from response
    delete user.password_hash;

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: 'Login successful',
      user,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Check if user still exists
    const result = await query('SELECT id, email, role, full_name FROM users WHERE id = $1', [decoded.id]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    const user = result.rows[0];

    // Generate NEW access token
    const accessToken = generateAccessToken(user);
    // Optionally rotate refresh token too
    const newRefreshToken = generateRefreshToken(user);

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired' });
    }
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};
