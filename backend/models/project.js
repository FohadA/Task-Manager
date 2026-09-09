const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true },
  fechaLimite: { type: Date },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
}, { timestamps: true });

proyectoSchema.index({ usuario: 1, createdAt: -1 });
proyectoSchema.index({ usuario: 1, nombre: 'text' });

module.exports = mongoose.model('Proyecto', proyectoSchema);