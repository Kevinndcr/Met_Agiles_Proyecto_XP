import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/helpers';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      toast.error('Error al cargar el producto');
      console.log(error)
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    if (quantity > product.stock) {
      toast.error('No hay suficiente stock disponible');
      return;
    }

    addToCart(product, quantity);
    toast.success('Producto agregado al carrito');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Producto no encontrado</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Volver</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          {product.imagen_producto ? (
            <img
              src={product.imagen_producto}
              alt={product.nombre_producto}
              className="w-full h-96 lg:h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 lg:h-full bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.nombre_producto}
            </h1>
            {product.categoria && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {product.categoria}
              </span>
            )}
          </div>

          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.precio_unitario)}
          </div>

          {product.descripcion && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {product.talla && (
              <div>
                <span className="text-sm font-medium text-gray-700">Talla:</span>
                <div className="mt-1">
                  <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                    {product.talla}
                  </span>
                </div>
              </div>
            )}
            
            {product.color && (
              <div>
                <span className="text-sm font-medium text-gray-700">Color:</span>
                <div className="mt-1">
                  <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                    {product.color}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700">Stock disponible:</span>
            <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock} unidades
            </span>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 input-field"
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary w-full lg:w-auto flex items-center justify-center space-x-2 px-8 py-3"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Agregar al carrito</span>
              </button>
            </div>
          )}

          {product.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">Este producto está agotado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;