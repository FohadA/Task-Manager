const Joi = require('joi');

const registerSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required().messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'any.required': 'El nombre es requerido',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.base': 'El email debe ser texto',
    'string.empty': 'El email es requerido',
    'string.email': 'El email debe tener un formato válido',
    'any.required': 'El email es requerido',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'La contraseña debe ser texto',
    'string.empty': 'La contraseña es requerida',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es requerida',
  }),
}).messages({
  'object.unknown': 'El campo {#label} no está permitido',
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.base': 'El email debe ser texto',
    'string.empty': 'El email es requerido',
    'string.email': 'El email debe tener un formato válido',
    'any.required': 'El email es requerido',
  }),
  password: Joi.string().required().messages({
    'string.base': 'La contraseña debe ser texto',
    'string.empty': 'La contraseña es requerida',
    'any.required': 'La contraseña es requerida',
  }),
}).messages({
  'object.unknown': 'El campo {#label} no está permitido',
});

module.exports = { registerSchema, loginSchema };
