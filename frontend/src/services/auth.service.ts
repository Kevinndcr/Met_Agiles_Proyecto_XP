import { http } from "@/lib/http";

export type LoginInput = { email: string; password: string };
export type LoginResponse = { token: string };

export const login = async (payload: LoginInput) => {
  const { data } = await http.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: {
  nombre: string; apellido: string; email: string; password: string;
}) => {
  const { data } = await http.post("/auth/register", payload);
  return data;
};