# TaskFlow - Sistema de Gestión de Tareas

## 🚀 Funcionalidades Implementadas

✅ **Autenticación completa**
- Registro de usuarios con validación
- Inicio de sesión con JWT
- Verificación de tokens automática
- Cierre de sesión seguro
- Persistencia de sesión en localStorage

✅ **Interfaz de usuario**
- Dashboard principal responsive
- Diferentes vistas para usuarios logueados/no logueados
- Navbar dinámico según estado de autenticación
- Formularios de login y registro con validación

## 🛠️ Cómo ejecutar la aplicación

### Backend
1. Abre una terminal en la carpeta `backend`
2. Ejecuta:
   ```bash
   npm install
   npm start
   ```
3. El servidor estará disponible en http://localhost:3000

### Frontend
1. Abre otra terminal en la carpeta `frontend`
2. Ejecuta:
   ```bash
   npm install
   npm start
   ```
3. La aplicación estará disponible en http://localhost:3001

## 🔧 API Endpoints Disponibles

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token (requiere Authorization header)

### Ejemplo de uso:

**Registro:**
```json
POST http://localhost:3000/api/auth/register
{
  "name": "Juan Pérez",
  "email": "usuario@ejemplo.com",
  "password": "mipassword123"
}
```

**Login:**
```json
POST http://localhost:3000/api/auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "mipassword123"
}
```

## 🌟 Características de la UI

### Para usuarios no logueados:
- Página de bienvenida con información del producto
- Botones para registrarse o iniciar sesión
- Cards con características de la aplicación

### Para usuarios logueados:
- Saludo personalizado con el nombre del usuario
- Dashboard con tareas de ejemplo
- Estadísticas de productividad
- Navbar con opciones de usuario y logout

## 📱 Responsive Design

La aplicación está optimizada para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔒 Seguridad

- Tokens JWT con expiración automática
- Validación de formularios tanto en frontend como backend
- Verificación automática de tokens al cargar la aplicación
- Limpieza automática de localStorage si el token expira

## 📋 Próximas funcionalidades

- [ ] CRUD completo de tareas
- [ ] Categorías personalizables
- [ ] Filtros y búsqueda
- [ ] Notificaciones en tiempo real
- [ ] Dashboard con métricas avanzadas

## 🐛 Solución de problemas

Si tienes problemas de CORS, asegúrate de que:
1. El backend esté ejecutándose en el puerto 3000
2. El frontend esté ejecutándose en el puerto 3001
3. El proxy esté configurado correctamente en el package.json del frontend

Para reiniciar completamente:
1. Detén ambos servidores (Ctrl+C)
2. Elimina node_modules en ambas carpetas
3. Ejecuta `npm install` en ambas carpetas
4. Inicia los servidores nuevamente
