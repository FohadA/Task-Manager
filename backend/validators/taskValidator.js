const Joi = require('joi');

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
  'string.base': 'El id debe ser texto',
  'string.empty': 'El id es requerido',
  'string.pattern.base': 'Id inválido',
  'any.required': 'El id es requerido',
});

const createTaskSchema = Joi.object({
  titulo: Joi.string().trim().min(2).required().messages({
    'string.base': 'El título debe ser texto',
    'string.empty': 'El título es requerido',
    'string.min': 'El título debe tener al menos 2 caracteres',
    'any.required': 'El título es requerido',
  }),
  descripcion: Joi.string().trim().allow('').optional().messages({
    'string.base': 'La descripción debe ser texto',
  }),
  estado: Joi.string().valid('pendiente', 'en_progreso', 'completada').optional().messages({
    'string.base': 'El estado debe ser texto',
    'string.empty': 'El estado es requerido',
    'any.only': 'El estado debe ser uno de: pendiente, en_progreso, completada',
  }),
  prioridad: Joi.string().valid('baja', 'media', 'alta').optional().messages({
    'string.base': 'La prioridad debe ser texto',
    'string.empty': 'La prioridad es requerida',
    'any.only': 'La prioridad debe ser una de: baja, media, alta',
  }),
  fechaVencimiento: Joi.date().optional().messages({
    'date.base': 'La fecha de vencimiento debe ser una fecha válida',
  }),
  proyecto: objectId.required().messages({
    'string.base': 'El proyecto debe ser texto',
    'string.empty': 'El proyecto es requerido',
    'string.pattern.base': 'El id del proyecto es inválido',
    'any.required': 'El proyecto es requerido',
  }),
}).messages({
  'object.unknown': 'El campo {#label} no está permitido',
});

const updateTaskSchema = Joi.object({
  titulo: Joi.string().trim().min(2).messages({
    'string.base': 'El título debe ser texto',
    'string.empty': 'El título es requerido',
    'string.min': 'El título debe tener al menos 2 caracteres',
  }),
  descripcion: Joi.string().trim().allow('').messages({
    'string.base': 'La descripción debe ser texto',
  }),
  estado: Joi.string().valid('pendiente', 'en_progreso', 'completada').messages({
    'string.base': 'El estado debe ser texto',
    'string.empty': 'El estado es requerido',
    'any.only': 'El estado debe ser uno de: pendiente, en_progreso, completada',
  }),
  prioridad: Joi.string().valid('baja', 'media', 'alta').messages({
    'string.base': 'La prioridad debe ser texto',
    'string.empty': 'La prioridad es requerida',
    'any.only': 'La prioridad debe ser una de: baja, media, alta',
  }),
  fechaVencimiento: Joi.date().messages({
    'date.base': 'La fecha de vencimiento debe ser una fecha válida',
  }),
}).min(1).messages({
  'object.min': 'Debes enviar al menos un campo para actualizar',
  'object.unknown': 'El campo {#label} no está permitido',
});

module.exports = { createTaskSchema, updateTaskSchema };
