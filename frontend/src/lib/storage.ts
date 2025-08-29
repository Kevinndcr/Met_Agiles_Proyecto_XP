const TOKEN_KEY = "auth_token";
const CART_ANON_KEY = "cart_items_anon";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// helpers de carrito por usuario
const cartKey = (userId?: string | null) =>
  userId ? `cart_items_${userId}` : CART_ANON_KEY;

export const getCartFor = (userId?: string | null) => {
  const key = cartKey(userId);
  const raw = localStorage.getItem(key) ?? localStorage.getItem("cart_items"); // compat
  return raw ? JSON.parse(raw) : [];
};

export const setCartFor = (userId: string | null | undefined, items: unknown) => {
  const key = cartKey(userId);
  localStorage.setItem(key, JSON.stringify(items));
  // limpia key vieja global si existiera
  localStorage.removeItem("cart_items");
};

export const clearCartFor = (userId?: string | null) => {
  localStorage.removeItem(cartKey(userId));
};