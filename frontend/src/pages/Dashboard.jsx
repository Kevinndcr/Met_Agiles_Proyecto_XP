import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import RecommendationsList from '../components/recommendations/RecommendationsList';
import Cart from '../components/orders/Cart';
import { 
  ShoppingCartIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { formatPrice } from '../utils/helpers';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const {  getTotalPrice, getTotalItems } = useCart();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    recentOrders: []
  });
  const [, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Cargar órdenes del usuario
      const orders = await orderService.getAllOrders();
      
      // Cargar productos para mostrar algunos destacados
      const productsData = await productService.getAllProducts();
      
      // Calcular estadísticas
      const totalSpent = orders.reduce((sum, order) => sum + order.precio_total, 0);
      const recentOrders = orders.slice(0, 3); // Últimas 3 órdenes

      setStats({
        totalOrders: orders.length,
        totalSpent,
        recentOrders
      });
      
      setProducts(productsData.slice(0, 6)); // Primeros 6 productos
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenido, {user?.nombre}
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu actividad y recomendaciones personalizadas.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Órdenes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.totalSpent)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCartIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Carrito</p>
                <p className="text-2xl font-semibold text-gray-900">{getTotalItems()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Valor Carrito</p>
                <p className="text-2xl font-semibold text-gray-900">{formatPrice(getTotalPrice())}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Órdenes Recientes</h3>
            {stats.recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tienes órdenes recientes</p>
            ) : (
              <div className="space-y-3">
                {stats.recentOrders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Orden #{order._id.slice(-8)}</span>
                      <span className="text-sm text-gray-600">{formatPrice(order.precio_total)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{order.items.length} productos</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <a href="/orders" className="btn-primary w-full text-center block">
                Ver Todas las Órdenes
              </a>
            </div>
          </div>

          {/* Recommendations */}
          <RecommendationsList />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="/products" className="btn-primary text-center">
                Explorar Productos
              </a>
              <button
                onClick={() => setCartOpen(true)}
                className="btn-secondary text-center"
                disabled={getTotalItems() === 0}
              >
                Ver Carrito ({getTotalItems()})
              </button>
              <a href="/profile" className="btn-secondary text-center">
                Mi Perfil
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Dashboard;