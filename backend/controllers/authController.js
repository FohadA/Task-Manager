const authService = require('../services/authService');

const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

module.exports = { registerUser, loginUser };