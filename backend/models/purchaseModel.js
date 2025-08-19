const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  id_compra: { type: String, required: true, unique: true },
  id_ordenCompra: { type: String, required: true },
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
  fecha_compra: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Purchase', purchaseSchema);
