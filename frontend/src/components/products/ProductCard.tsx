//src/components/products/ProductCard.tsx
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <img
        src={product.imagen_producto || "https://via.placeholder.com/300x200?text=Producto"}
        alt={product.nombre_producto}
        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }}
      />
      <h3 style={{ margin: "8px 0" }}>{product.nombre_producto}</h3>
      <p style={{ margin: 0 }}>${product.precio_unitario.toFixed(2)}</p>
      <button style={{ marginTop: 8 }} onClick={() => addItem(product, 1)}>
        Añadir al carrito
      </button>
    </div>
  );
}