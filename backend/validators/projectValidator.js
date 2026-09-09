const Joi = require('joi');

const createProjectSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required().messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'any.required': 'El nombre es requerido',
  }),
  descripcion: Joi.string().trim().allow('').optional().messages({
    'string.base': 'La descripción debe ser texto',
  }),
  fechaLimite: Joi.date().optional().messages({
    'date.base': 'La fecha límite debe ser una fecha válida',
  }),
}).messages({
  'object.unknown': 'El campo {#label} no está permitido',
});

const updateProjectSchema = Joi.object({
  nombre: Joi.string().trim().min(2).messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
  }),
  descripcion: Joi.string().trim().allow('').messages({
    'string.base': 'La descripción debe ser texto',
  }),
  fechaLimite: Joi.date().messages({
    'date.base': 'La fecha límite debe ser una fecha válida',
  }),
}).min(1).messages({
  'object.min': 'Debes enviar al menos un campo para actualizar',
  'object.unknown': 'El campo {#label} no está permitido',
});

module.exports = { createProjectSchema, updateProjectSchema };
