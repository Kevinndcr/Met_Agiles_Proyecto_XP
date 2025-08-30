import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightIcon, ShoppingBagIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bienvenido a TiendaRopa
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre nuestra increíble colección de ropa con los mejores precios y calidad. 
            Encuentra tu estilo perfecto con nosotros.
          </p>
          <div className="space-x-4">
            <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Ver Productos
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Registrarse
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Amplia Variedad</h3>
              <p className="text-gray-600">
                Miles de productos de las mejores marcas y estilos para todos los gustos.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calidad Premium</h3>
              <p className="text-gray-600">
                Productos de alta calidad con materiales duraderos y diseños únicos.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atención al Cliente</h3>
              <p className="text-gray-600">
                Servicio personalizado y soporte 24/7 para una experiencia de compra excepcional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explora nuestra colección y encuentra tu estilo perfecto
          </p>
          <Link
            to="/products"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Explorar Productos</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;