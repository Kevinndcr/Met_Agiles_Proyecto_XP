const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TiendaRopa</h3>
            <p className="text-gray-300">
              Tu tienda de ropa favorita con los mejores productos y precios.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Inicio</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white transition">Productos</a></li>
              <li><a href="/orders" className="text-gray-300 hover:text-white transition">Órdenes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300">Email: info@tiendaropa.com</p>
            <p className="text-gray-300">Teléfono: +506 1234-5678</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 TiendaRopa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;