const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  clave: String,
  rol: String
});


UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('clave')) return next();
  const salt = await bcrypt.genSalt(10);
  this.clave = await bcrypt.hash(this.clave, salt);
  next();
});


UsuarioSchema.methods.compararClave = function(claveIngresada) {
  return bcrypt.compare(claveIngresada, this.clave);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
