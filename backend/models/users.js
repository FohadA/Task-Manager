const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido'],
  },
  password: { type: String, required: true, select: false },
}, { timestamps: true });

usuarioSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

usuarioSchema.methods.compararPassword = function (candidata) {
  return bcrypt.compare(candidata, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);