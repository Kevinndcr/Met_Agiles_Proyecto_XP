import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getCartFor, setCartFor, clearCartFor } from "@/lib/storage";
import type { Product } from "@/types/product";
import { useAuthStore } from "@/store/auth.store";

export type CartItem = {
  id_producto: string;
  nombre_producto: string;
  precio_unitario: number;
  cantidad: number;
  imagen_producto?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  const [items, setItems] = useState<CartItem[]>(() => getCartFor(null));
  const prevUserId = useRef<string | null>(null);

  // Cambios de sesión: merge anon -> usuario; y cargar anon en logout.
  useEffect(() => {
    const uid = user?._id ?? null;

    if (uid && prevUserId.current !== uid) {
      const anon = getCartFor(null);
      const own = getCartFor(uid);
      const map = new Map<string, CartItem>();

      for (const it of [...own, ...anon]) {
        const cur = map.get(it.id_producto);
        map.set(
          it.id_producto,
          cur ? { ...cur, cantidad: cur.cantidad + it.cantidad } : { ...it }
        );
      }
      const merged = Array.from(map.values());
      setItems(merged);
      setCartFor(uid, merged);
      clearCartFor(null);
      prevUserId.current = uid;
      return;
    }

    if (!uid && prevUserId.current) {
      const anon = getCartFor(null);
      setItems(anon);
      prevUserId.current = null;
      return;
    }

    // primer render
    setItems(getCartFor(uid));
    prevUserId.current = uid;
  }, [user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persistir cada cambio
  useEffect(() => {
    const uid = user?._id ?? null;
    setCartFor(uid, items);
  }, [items, user?._id]);

  const addItem = (p: Product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id_producto === p.id_producto);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], cantidad: next[idx].cantidad + qty };
        return next;
      }
      return [
        ...prev,
        {
          id_producto: p.id_producto,
          nombre_producto: p.nombre_producto,
          precio_unitario: p.precio_unitario,
          cantidad: qty,
          imagen_producto: p.imagen_producto,
        },
      ];
    });
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id_producto !== id));

  const setQuantity = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id_producto === id ? { ...i, cantidad: Math.max(1, qty) } : i
      )
    );

  const clear = () => {
    const uid = user?._id ?? null;
    clearCartFor(uid);
    setItems([]);
  };

  const value = useMemo<CartContextType>(
    () => ({ items, addItem, removeItem, setQuantity, clear }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartStore() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartStore must be used within CartProvider");
  return ctx;
}