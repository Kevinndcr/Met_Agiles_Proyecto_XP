import { createContext, useContext, useState, type ReactNode } from "react";
import { getToken, setToken as persistToken, clearToken } from "@/lib/storage";
import type { User } from "@/types/user";

type AuthContextType = {
  token: string | null;
  user: User | null;
  setAuthToken: (t: string) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken());
  const [user, setUserState] = useState<User | null>(null);

  const setAuthToken = (t: string) => {
    persistToken(t);
    setTokenState(t);
  };

  const setUser = (u: User | null) => setUserState(u);

  const logout = () => {
    clearToken();
    setUserState(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuthToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthStore() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore must be used within AuthProvider");
  return ctx;
}