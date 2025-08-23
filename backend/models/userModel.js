const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_usuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  direcciones: [
    {
      linea1: String,
      ciudad: String,
      pais: String,
      zip: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
