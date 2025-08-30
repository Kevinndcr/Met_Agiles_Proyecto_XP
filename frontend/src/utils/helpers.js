import { ORDER_STATUSES } from './constants'

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