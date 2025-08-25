const TOKEN_KEY = "auth_token";
const CART_KEY = "cart_items";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getCart = () => {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
};
export const setCart = (items: unknown) =>
  localStorage.setItem(CART_KEY, JSON.stringify(items));
export const clearCart = () => localStorage.removeItem(CART_KEY);