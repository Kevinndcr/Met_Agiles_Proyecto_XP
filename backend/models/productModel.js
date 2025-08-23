const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // id_producto eliminado, se usará el ObjectId de MongoDB
  nombre_producto: { type: String, required: true },
  precio_unitario: { type: Number, required: true },
  descripcion: { type: String },
  imagen_producto: { type: String },
  categoria: { type: String },
  talla: { type: String, enum: ['S', 'M', 'L', 'XL'] },
  color: { type: String },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
