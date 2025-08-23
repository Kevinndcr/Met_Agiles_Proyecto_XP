const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Purchase routes
router.get('/', authMiddleware, purchaseController.getAllPurchases);
router.get('/:id', authMiddleware, purchaseController.getPurchaseById);
router.post('/', authMiddleware, purchaseController.createPurchase);

module.exports = router;
