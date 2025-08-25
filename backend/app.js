const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

/** Middlewares base (ANTES de las rutas) **/
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev')); // GET /api/... 200 32 - 3.2 ms

// (opcional) logger sencillo para ver body
app.use((req, _res, next) => {
  if (req.method !== 'GET') {
    console.log('Body →', req.body);
  }
  next();
});

/** Healthcheck rápido **/
app.get('/api/health', (_req, res) => res.json({ ok: true }));

/** Rutas (prefijos correctos) **/
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/purchases', purchaseRoutes);

module.exports = app;