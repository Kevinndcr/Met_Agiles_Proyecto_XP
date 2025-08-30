import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { formatPrice } from '../../utils/helpers';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito');
  };

  const handleCreateOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error('Por favor ingresa una dirección de envío');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          id_producto: item.id_producto,
          nombre_producto: item.nombre_producto,
          precio_unitario: item.precio_unitario,
          cantidad: item.cantidad,
          subtotal: item.precio_unitario * item.cantidad
        })),
        precio_total: getTotalPrice(),
        direccion_envio: shippingAddress,
        estado: 'pendiente'
      };

      await orderService.createOrder(orderData);
      clearCart();
      onClose();
      toast.success('Orden creada exitosamente');
    } catch (error) {
      toast.error('Error al crear la orden');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id_producto} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.nombre_producto}</h4>
                      <p className="text-gray-600 text-sm">{formatPrice(item.precio_unitario)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id_producto, item.cantidad - 1)}
                        className="p-1 rounded-full hover:bg-gray-200"
                        disabled={item.cantidad <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      
                      <span className="w-8 text-center text-sm">{item.cantidad}</span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.id_producto, item.cantidad + 1)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id_producto)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span className="text-lg">{formatPrice(getTotalPrice())}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de envío
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Ingresa tu dirección completa..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <button
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Procesando...' : 'Crear Orden'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;