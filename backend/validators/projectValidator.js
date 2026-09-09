const Joi = require('joi');

const createProjectSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required(),
  descripcion: Joi.string().trim().allow('').optional(),
  fechaLimite: Joi.date().optional(),
});

const updateProjectSchema = Joi.object({
  nombre: Joi.string().trim().min(2),
  descripcion: Joi.string().trim().allow(''),
  fechaLimite: Joi.date(),
}).min(1);

module.exports = { createProjectSchema, updateProjectSchema };