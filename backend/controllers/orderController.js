const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Purchase = require('../models/purchaseModel'); // Asegúrate de tener el modelo de Purchase importado
const mongoose = require('mongoose');
const { generateRecommendations } = require('../utils/aiService');

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


exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id; // Usar el ID del usuario autenticado

    // Obtener todas las órdenes del usuario
    const userOrders = await Order.find({ id_usuario: userId });

    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
    }

    // Extraer productos únicos del historial de órdenes
    const purchasedProductsSet = new Set();
    userOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.id_producto && item.nombre_producto) {
          purchasedProductsSet.add(JSON.stringify({
            id: item.id_producto,
            nombre: item.nombre_producto
          }));
        }
      });
    });

    // Convertir set a array de objetos
    const purchasedProducts = Array.from(purchasedProductsSet).map(item => JSON.parse(item));

    // Obtener todos los productos actuales disponibles
    const allProducts = await Product.find({}, { _id: 1, nombre_producto: 1 });
    const availableProducts = allProducts.map(product => ({
      id: product._id.toString(),
      nombre: product.nombre_producto
    }));

    // Generar recomendaciones usando IA
    console.log('Generando recomendaciones con IA...');
    const recommendations = await generateRecommendations(purchasedProducts, availableProducts);
    
    res.json({
      message: 'Recomendaciones generadas exitosamente',
      user_id: userId,
      total_orders: userOrders.length,
      purchased_products_count: purchasedProducts.length,
      recommendations: recommendations
    });

  } catch (err) {
    console.error('Error generating recommendations:', err);
    res.status(500).json({ error: err.message });
  }
};