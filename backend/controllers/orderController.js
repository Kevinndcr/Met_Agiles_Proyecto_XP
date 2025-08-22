const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Purchase = require('../models/purchaseModel'); // Asegúrate de tener el modelo de Purchase importado
const mongoose = require('mongoose');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ id_usuario: req.user._id });
    res.send(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, id_usuario: req.user._id });
    if (!order) return res.status(404).send('Order not found');

    res.send(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const items = req.body.items;

    // Validar que todos los productos existen
    for (const item of items) {
      const product = await Product.findById(item.id_producto);
      if (!product) {
        return res.status(400).json({ error: `Producto con id ${item.id_producto} no existe.` });
      }
    }

    const orderData = {
      ...req.body,
      id_usuario: req.user._id,
      estado: req.body.estado || 'pendiente'
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, id_usuario: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).send('Order not found');

    // Check if the order status is "completado" and create a purchase
    if (updatedOrder.estado === "completado") {
      const newPurchase = new Purchase({
        id_compra: new mongoose.Types.ObjectId().toString(),
        id_ordenCompra: updatedOrder._id.toString(),
        items: updatedOrder.items,
        precio_total: updatedOrder.precio_total,
      });
      await newPurchase.save();
    }

    res.send(updatedOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id, id_usuario: req.user._id });
    if (!deletedOrder) return res.status(404).send('Order not found');

    res.send(deletedOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
