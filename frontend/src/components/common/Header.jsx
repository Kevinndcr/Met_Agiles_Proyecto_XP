import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Cart from '../orders/Cart';
import { ShoppingCartIcon, UserIcon, HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TiendaRopa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
                Inicio
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">
                Productos
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/orders" className="text-gray-600 hover:text-blue-600 transition">
                    Órdenes
                  </Link>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                    Dashboard
                  </Link>
                </>
              )}
            </nav>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              {isAuthenticated && (
                <button 
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-blue-600 transition"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              )}

              {/* Desktop User menu */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                      <UserIcon className="h-6 w-6" />
                      <span>{user?.nombre}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-red-600 transition"
                    >
                      Salir
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary"
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t">
              <nav className="space-y-3">
                <Link 
                  to="/" 
                  className="block text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/products" 
                  className="block text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Productos
                </Link>
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/orders" 
                      className="block text-gray-600 hover:text-blue-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Órdenes
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="block text-gray-600 hover:text-blue-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block text-gray-600 hover:text-blue-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-red-600 hover:text-red-700 transition"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link 
                      to="/login" 
                      className="block text-gray-600 hover:text-blue-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/register" 
                      className="block btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Modal */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;