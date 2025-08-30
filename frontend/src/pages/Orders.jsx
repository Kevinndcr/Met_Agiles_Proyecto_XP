import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import OrderCard from '../components/orders/OrderCard';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderUpdate = (updatedOrder) => {
    setOrders(orders.map(order => 
      order._id === updatedOrder._id ? updatedOrder : order
    ));
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Órdenes</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No tienes órdenes aún</p>
          <a href="/products" className="btn-primary">
            Explorar Productos
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              onUpdate={handleOrderUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;