const jwt = require('jsonwebtoken');
const Usuario = require('../models/users');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Usuario.findById(decoded.id);

      if (!req.user) {
        res.status(401);
        return next(new Error('Not authorized, user does not exist'));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Not authorized, invalid or expired token'));
    }
  }

  res.status(401);
  return next(new Error('Not authorized, no token provided'));
};

module.exports = { protect };