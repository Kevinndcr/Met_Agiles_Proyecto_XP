import { useState } from 'react';
import { orderService } from '../../services/orderService';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '../../utils/helpers';
import { ORDER_STATUSES } from '../../utils/constants';
import toast from 'react-hot-toast';

const OrderCard = ({ order, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(order.estado);

  const handleUpdateStatus = async () => {
    if (newStatus === order.estado) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const updatedOrder = await orderService.updateOrder(order._id, { estado: newStatus });
      onUpdate(updatedOrder);
      setIsEditing(false);
      toast.success('Estado de la orden actualizado');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Error al actualizar el estado');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = getStatusColor(order.estado);
  const statusColorClasses = {
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">Orden #{order._id.slice(-8)}</h3>
          <p className="text-gray-600 text-sm">{formatDate(order.fecha_creacion)}</p>
        </div>
        
        <div className="text-right">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="text-sm input-field py-1"
              >
                {ORDER_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={loading}
                className="btn-primary text-xs px-2 py-1"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary text-xs px-2 py-1"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColorClasses[statusColor]}`}>
                {getStatusLabel(order.estado)}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-xs"
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span>{item.nombre_producto} x{item.cantidad}</span>
            <span>{formatPrice(item.subtotal || (item.precio_unitario * item.cantidad))}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Dirección de envío:</p>
          <p className="text-sm">{order.direccion_envio}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{formatPrice(order.precio_total)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;