const jwt = require('jsonwebtoken');

module.exports = (roles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    console.log('Decoded User:', user);
    // if (roles.length && !roles.includes(user.role)) return res.sendStatus(403);
    req.user = user;
    next();
  } catch {
    res.sendStatus(401);
  }
};