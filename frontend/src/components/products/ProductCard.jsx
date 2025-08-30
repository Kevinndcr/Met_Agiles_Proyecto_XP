import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    addToCart(product, 1);
    toast.success('Producto agregado al carrito');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
          {product.imagen_producto ? (
            <img
              src={product.imagen_producto}
              alt={product.nombre_producto}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {product.nombre_producto}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.descripcion}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.precio_unitario)}
            </span>
            {product.categoria && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {product.categoria}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {product.talla && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Talla: {product.talla}
                </span>
              )}
              {product.color && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {product.color}
                </span>
              )}
            </div>
            
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition ${
            product.stock === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'btn-primary'
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>{product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;