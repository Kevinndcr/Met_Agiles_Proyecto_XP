import axios, { type InternalAxiosRequestConfig } from "axios";
import { getToken } from "@/lib/storage";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api",
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    // asegura que headers exista y agrega el Authorization
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`, // 👈 backticks correctos
    } as any;
  }
  return config;
});