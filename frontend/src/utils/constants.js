export const PRODUCT_CATEGORIES = [
  'Camisas',
  'Pantalones',
  'Vestidos',
  'Zapatos',
  'Accesorios',
  'Chaquetas',
  'Faldas',
  'Shorts'
];

export const PRODUCT_SIZES = ['S', 'M', 'L', 'XL'];

export const ORDER_STATUSES = [
  { value: 'pendiente', label: 'Pendiente', color: 'yellow' },
  { value: 'pagado', label: 'Pagado', color: 'blue' },
  { value: 'cancelado', label: 'Cancelado', color: 'red' },
  { value: 'enviado', label: 'Enviado', color: 'purple' },
  { value: 'entregado', label: 'Entregado', color: 'green' },
  { value: 'completado', label: 'Completado', color: 'green' }
];

// src/utils/helpers.js
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const getStatusColor = (status) => {
  const statusObj = ORDER_STATUSES.find(s => s.value === status);
  return statusObj ? statusObj.color : 'gray';
};

export const getStatusLabel = (status) => {
  const statusObj = ORDER_STATUSES.find(s => s.value === status);
  return statusObj ? statusObj.label : status;
};