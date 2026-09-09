const jwt = require('jsonwebtoken');
const Usuario = require('../models/users');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const register = async ({ nombre, email, password }) => {
  const exists = await Usuario.findOne({ email });
  if (exists) {
    const error = new Error('Email is already registered');
    error.statusCode = 400;
    throw error;
  }

  const usuario = await Usuario.create({ nombre, email, password });

  return {
    usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    token: generateToken(usuario._id),
  };
};

const login = async ({ email, password }) => {
  const usuario = await Usuario.findOne({ email }).select('+password');
  const validCredentials = usuario && (await usuario.compararPassword(password));

  if (!validCredentials) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  return {
    usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    token: generateToken(usuario._id),
  };
};

module.exports = { register, login, generateToken };