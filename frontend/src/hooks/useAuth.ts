import { useMutation } from "@tanstack/react-query";
import {
  login as apiLogin,
  register as apiRegister,
  type LoginInput, // 👈 type-only import
} from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { setAuthToken } = useAuthStore();

  const login = useMutation({
    mutationFn: (payload: LoginInput) => apiLogin(payload),
    onSuccess: (data) => setAuthToken(data.token),
  });

  const register = useMutation({
    mutationFn: apiRegister,
  });

  return { login, register };
}