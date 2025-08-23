const Purchase = require('../models/purchaseModel');

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ id_usuario: req.user._id });
    res.send(purchases);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ _id: req.params.id, id_usuario: req.user._id });
    if (!purchase) return res.status(404).send('Purchase not found');

    res.send(purchase);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase({ ...req.body, id_usuario: req.user._id });
    await newPurchase.save();

    res.status(201).send(newPurchase);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
