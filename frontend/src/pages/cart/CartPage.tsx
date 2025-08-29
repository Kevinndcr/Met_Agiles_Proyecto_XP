import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/store/cart.store";
import type { ChangeEvent } from "react";

export default function CartPage() {
  const { items, total, setQuantity, removeItem, clear } = useCart();

  if (items.length === 0) return <p>Tu carrito está vacío.</p>;

  const onQtyChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setQuantity(id, Number.isFinite(n) && n > 0 ? n : 1);
  };

  return (
    <div>
      <h1>Carrito</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((i: CartItem) => (
          <li
            key={i.id_producto}
            style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}
          >
            <img
              src={i.imagen_producto || "https://via.placeholder.com/80x60"}
              alt={i.nombre_producto}
              style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }}
            />
            <div style={{ flex: 1 }}>
              <div>{i.nombre_producto}</div>
              <div>${i.precio_unitario.toFixed(2)}</div>
            </div>

            <input
              type="number"
              min={1}
              value={i.cantidad}
              onChange={onQtyChange(i.id_producto)}
              style={{ width: 64 }}
            />

            <button onClick={() => removeItem(i.id_producto)}>Quitar</button>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: 16 }}>Total: ${total.toFixed(2)}</h2>
      <button onClick={clear}>Vaciar carrito</button>
      {/* Próximo paso: botón de checkout que haga POST /orders */}
    </div>
  );
}