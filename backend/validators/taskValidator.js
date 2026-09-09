const Joi = require('joi');

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
  'string.pattern.base': 'Id inválido',
});

const createTaskSchema = Joi.object({
  titulo: Joi.string().trim().min(2).required(),
  descripcion: Joi.string().trim().allow('').optional(),
  estado: Joi.string().valid('pendiente', 'en_progreso', 'completada').optional(),
  prioridad: Joi.string().valid('baja', 'media', 'alta').optional(),
  fechaVencimiento: Joi.date().optional(),
  proyecto: objectId.required(),
});

const updateTaskSchema = Joi.object({
  titulo: Joi.string().trim().min(2),
  descripcion: Joi.string().trim().allow(''),
  estado: Joi.string().valid('pendiente', 'en_progreso', 'completada'),
  prioridad: Joi.string().valid('baja', 'media', 'alta'),
  fechaVencimiento: Joi.date(),
}).min(1);

module.exports = { createTaskSchema, updateTaskSchema };