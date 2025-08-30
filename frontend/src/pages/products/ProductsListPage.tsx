import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products.service";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsListPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  if (isLoading) return <p>Cargando productos…</p>;
  if (isError) return <p style={{ color: "crimson" }}>No se pudieron cargar los productos.</p>;
  if (!data || data.length === 0) return <p>No hay productos.</p>;

  return (
    <div>
      <h1>Catálogo</h1>
      <ProductGrid products={data} />
    </div>
  );
}