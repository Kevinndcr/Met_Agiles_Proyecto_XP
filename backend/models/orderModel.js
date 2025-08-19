const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id_ordenCompra: { type: String, required: true, unique: true },
  id_usuario: { type: String, required: true },
  items: [
    {
      id_producto: String,
      nombre_producto: String,
      precio_unitario: Number,
      cantidad: Number,
      subtotal: Number,
    },
  ],
  precio_total: { type: Number, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'pagado', 'cancelado', 'enviado', 'entregado'], required: true },
  direccion_envio: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
