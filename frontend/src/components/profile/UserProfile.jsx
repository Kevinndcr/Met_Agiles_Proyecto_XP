import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { UserIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    direcciones: user?.direcciones || [{
      linea1: '',
      ciudad: '',
      pais: '',
      zip: ''
    }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('direcciones.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        direcciones: [{
          ...formData.direcciones[0],
          [field]: value
        }]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUserData = await userService.updateProfile(formData);
      updateUser(updatedUserData);
      setIsEditing(false);
      toast.success('Perfil actualizado exitosamente');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
      direcciones: user?.direcciones || [{
        linea1: '',
        ciudad: '',
        pais: '',
        zip: ''
      }]
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
              <p className="text-gray-600">Gestiona tu información personal</p>
            </div>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Editar Perfil
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Dirección</h3>
              
              <div>
                <label htmlFor="direcciones.linea1" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direcciones.linea1"
                  name="direcciones.linea1"
                  value={formData.direcciones[0]?.linea1 || ''}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label htmlFor="direcciones.ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="direcciones.ciudad"
                    name="direcciones.ciudad"
                    value={formData.direcciones[0]?.ciudad || ''}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="direcciones.pais" className="block text-sm font-medium text-gray-700 mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    id="direcciones.pais"
                    name="direcciones.pais"
                    value={formData.direcciones[0]?.pais || ''}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="direcciones.zip" className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="direcciones.zip"
                  name="direcciones.zip"
                  value={formData.direcciones[0]?.zip || ''}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Nombre completo</p>
                  <p className="font-medium">{user?.nombre} {user?.apellido}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
            </div>

            {user?.direcciones && user.direcciones.length > 0 && (
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <div className="font-medium">
                    <p>{user.direcciones[0].linea1}</p>
                    <p>{user.direcciones[0].ciudad}, {user.direcciones[0].pais}</p>
                    <p>{user.direcciones[0].zip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;