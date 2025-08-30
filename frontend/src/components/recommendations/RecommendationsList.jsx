import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';

const RecommendationsList = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      loadRecommendations();
    }
  }, [user]);

  const loadRecommendations = async () => {
    try {
      const data = await orderService.getRecommendations(user._id);
      setRecommendations(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // No mostrar error si no hay órdenes o recomendaciones
      if (error.response?.status !== 404) {
        toast.error('Error al cargar recomendaciones');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="md" />;
  }

  if (!recommendations || !recommendations.recommendations || recommendations.recommendations.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recomendaciones de IA</h3>
          <p className="text-gray-600">
            Realiza algunas compras para recibir recomendaciones personalizadas basadas en IA.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <SparklesIcon className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">Recomendaciones de IA</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Basado en {recommendations.total_orders} órdenes y {recommendations.purchased_products_count} productos comprados
        </p>
      </div>
      
      <div className="space-y-3">
        {recommendations.recommendations.map((recommendation, index) => (
          <div key={index} className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="font-medium text-blue-900 mb-2">{recommendation.nombre}</h4>
            {recommendation.razon && (
              <p className="text-blue-800 text-sm">{recommendation.razon}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;