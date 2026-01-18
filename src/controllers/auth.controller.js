const bcrypt = require('bcrypt');
const Joi = require('joi');
const db = require('../db');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/jwt');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      'SELECT id, password FROM user WHERE username = ?',
      [username]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await db.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))`,
      [user.id, refreshToken]
    );

    res.json({
      accessToken,
      refreshToken
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { login };
