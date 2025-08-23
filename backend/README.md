# Tienda Ropa Backend

Este proyecto es una API REST para la gestión de una tienda de ropa, desarrollada con Node.js, Express y MongoDB.

## Características
- Gestión de usuarios, productos, órdenes y compras
- Autenticación con JWT
- Encriptación de contraseñas con bcrypt
- Documentación de la API en `API_Documentation.md`

## Instalación
1. Clona el repositorio.
2. Ve al directorio `backend`.
3. Instala las dependencias:
   ```powershell
   npm install
   ```
4. Configura el archivo `.env` con tus variables de entorno (ver ejemplo abajo).

## Ejemplo de archivo `.env`
```
MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=3000
```

## Ejecución
- Para iniciar el servidor:
  ```powershell
  npm start
  ```
- Para desarrollo con recarga automática:
  ```powershell
  npm run dev
  ```

## Estructura de carpetas
- `controllers/`: Lógica de negocio y manejo de rutas
- `models/`: Modelos de datos de MongoDB
- `routes/`: Definición de rutas de la API
- `middlewares/`: Middlewares personalizados
- `utils/`: Utilidades varias

## Autor
Equipo Met_Agiles_Proyecto_XP
