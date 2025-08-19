const Order = require('../models/orderModel');

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
    const newOrder = new Order({ ...req.body, id_usuario: req.user._id });
    await newOrder.save();

    res.status(201).send(newOrder);
  } catch (err) {
    res.status(500).send(err.message);
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
