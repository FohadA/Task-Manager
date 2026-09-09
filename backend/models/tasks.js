const mongoose = require('mongoose');
const { Schema } = mongoose;

const tareaSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true },
  estado: { type: String, enum: ['pendiente', 'en_progreso', 'completada'], default: 'pendiente' },
  prioridad: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
  fechaVencimiento: { type: Date },
  fechaCompletada: { type: Date, default: null },
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto', required: true, index: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
}, { timestamps: true });

tareaSchema.index({ usuario: 1, estado: 1 });
tareaSchema.index({ proyecto: 1, estado: 1 });
tareaSchema.index({ usuario: 1, fechaCompletada: 1 });

module.exports = mongoose.model('Tarea', tareaSchema);