//src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import {
  login as apiLogin,
  register as apiRegister,
  type LoginInput,
} from "@/services/auth.service";
import { getMe } from "@/services/users.service";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { setAuthToken, setUser } = useAuthStore();

  const login = useMutation({
    mutationFn: (payload: LoginInput) => apiLogin(payload),
    onSuccess: async (data) => {
      setAuthToken(data.token);
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        // si falla /users/me, mantenemos sesión con token
        setUser(null);
      }
    },
  });

  const register = useMutation({
    mutationFn: apiRegister,
  });

  return { login, register };
}