import { http } from "@/lib/http";
import type { User, UpdateUserInput } from "@/types/user";

export const getMe = async (): Promise<User> => {
  try {
    const { data } = await http.get<User>("/users/me");
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      const { data } = await http.get<User>("/users/profile");
      return data;
    }
    const { data } = await http.get<User>("/auth/me");
    return data;
  }
};

export const updateMe = async (payload: UpdateUserInput): Promise<User> => {
  try {
    const { data } = await http.put<User>("/users/me", payload);
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      const { data } = await http.put<User>("/users/profile", payload);
      return data;
    }
    const { data } = await http.put<User>("/auth/me", payload);
    return data;
  }
};

/** Intentos comunes para cambio de contraseña. Devuelve true si alguno funciona. */
export const changePassword = async (opts: {
  currentPassword: string;
  newPassword: string;
}): Promise<boolean> => {
  const payload = { currentPassword: opts.currentPassword, newPassword: opts.newPassword };

  // 1) PUT /users/me/password
  try {
    await http.put("/users/me/password", payload);
    return true;
  } catch (e: any) {
    if (e?.response?.status !== 404) throw e;
  }

  // 2) PUT /users/password
  try {
    await http.put("/users/password", payload);
    return true;
  } catch (e: any) {
    if (e?.response?.status !== 404) throw e;
  }

  // 3) POST /auth/change-password
  try {
    await http.post("/auth/change-password", payload);
    return true;
  } catch (e: any) {
    if (e?.response?.status !== 404) throw e;
  }

  // Ninguna ruta existe en este backend
  return false;
};