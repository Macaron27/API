const express = require('express');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
