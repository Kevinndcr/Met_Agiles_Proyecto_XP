export type Product = {
  id_producto: string; // o tu id alterno de 6 dígitos si lo aplican en backend
  nombre_producto: string;
  precio_unitario: number;
  descripcion?: string;
  imagen_producto?: string;
  categoria?: string;
  talla?: "S" | "M" | "L" | "XL";
  color?: string;
  stock: number;
};