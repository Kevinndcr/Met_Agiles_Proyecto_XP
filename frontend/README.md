.env.production

# README.md

# TiendaRopa Frontend

Frontend de React para la aplicación de tienda de ropa con funcionalidades completas de e-commerce.

## Características

- ✅ Autenticación completa (login, registro, logout)
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras funcional
- ✅ Gestión de órdenes
- ✅ Perfil de usuario editable
- ✅ Dashboard con estadísticas
- ✅ Recomendaciones de IA
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Navegación protegida
- ✅ Notificaciones toast

## Instalación

1. **Crear el proyecto**

   ```bash
   npm create vite@latest frontend -- --template react
   cd frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   npm install axios react-router-dom @heroicons/react react-hot-toast js-cookie
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configurar variables de entorno**

   ```bash
   echo "VITE_API_URL=http://localhost:3000/api" > .env
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
