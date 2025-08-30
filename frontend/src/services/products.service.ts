import { http } from "@/lib/http";
import type { Product } from "@/types/product";

export const getProducts = async () => {
  const { data } = await http.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
};