//src/hooks/useCart.ts
import { useMemo } from "react";
import { useCartStore } from "@/store/cart.store";

export function useCart() {
  const { items, addItem, removeItem, setQuantity, clear } = useCartStore();

  const total = useMemo(
    () => items.reduce((s, i) => s + i.precio_unitario * i.cantidad, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((s, i) => s + i.cantidad, 0),
    [items]
  );

  return { items, total, count, addItem, removeItem, setQuantity, clear };
}