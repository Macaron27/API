const bcrypt = require('bcrypt');
const db = require('../db');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

// Login: returns access + refresh token
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      'SELECT id, password FROM user WHERE username = ?',
      [username]
    );

    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token in DB
    await db.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))`,
      [user.id, refreshToken]
    );

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
}

// Refresh: returns a new access token
async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Missing refresh token' });

    const jwt = require('jsonwebtoken');

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      // Check DB
      const [rows] = await db.query(
        `SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()`,
        [refreshToken]
      );

      if (!rows.length) return res.status(403).json({ error: 'Refresh token revoked or expired' });

      const newAccessToken = generateAccessToken(payload.id);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    next(err);
  }
}

// Logout: revoke a refresh token
async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Missing refresh token' });

    await db.query(
      'DELETE FROM refresh_tokens WHERE token = ?',
      [refreshToken]
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, refresh, logout };
