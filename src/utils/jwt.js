const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES }
  );
}

function generateRefreshToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.userRole !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  requireRole
};
