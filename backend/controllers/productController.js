const Product = require('../models/productModel');
const mongoose = require('mongoose'); // Import mongoose
const { generateProductDescription } = require('../utils/aiService');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    };

    // Si no se proporciona descripción, generar automáticamente con IA
    if (!productData.descripcion) {
      console.log('Generando descripción automática con IA...');
      productData.descripcion = await generateProductDescription(productData);
      console.log('Descripción generada:', productData.descripcion);
    } else if (!productData.descripcion) {
      console.log('IA no disponible, usando descripción básica...');
      // Si no hay IA disponible, usar descripción básica
      const { generateFallbackDescription } = require('../utils/aiService');
      productData.descripcion = generateFallbackDescription(productData);
    }

    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Si se está actualizando sin descripción y se tienen datos suficientes, regenerar
    if (!updateData.descripcion) {
      // Obtener el producto actual para combinar datos
      const currentProduct = await Product.findById(req.params.id);
      if (currentProduct) {
        const combinedData = {
          nombre_producto: updateData.nombre_producto || currentProduct.nombre_producto,
          categoria: updateData.categoria || currentProduct.categoria,
          talla: updateData.talla || currentProduct.talla,
          color: updateData.color || currentProduct.color,
          precio_unitario: updateData.precio_unitario || currentProduct.precio_unitario,
        };
        
        console.log('Regenerando descripción con IA...');
        updateData.descripcion = await generateProductDescription(combinedData);
        console.log('Nueva descripción generada:', updateData.descripcion);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.regenerateDescription = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });


    console.log('Regenerando descripción manualmente...');
    const newDescription = await generateProductDescription(product.toObject());
    
    product.descripcion = newDescription;
    await product.save();

    res.json({ 
      message: 'Description regenerated successfully', 
      product: product 
    });
  } catch (err) {
    console.error('Error regenerating description:', err);
    res.status(500).json({ error: err.message });
  }
};
