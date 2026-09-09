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
        return next(new Error('No autorizado, el usuario no existe'));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('No autorizado, token inválido o expirado'));
    }
  }

  res.status(401);
  return next(new Error('No autorizado, no se proporcionó un token'));
};

module.exports = { protect };