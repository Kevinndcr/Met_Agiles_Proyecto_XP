import { createContext, useContext, useState, type ReactNode } from "react";
import { getToken, setToken as persistToken, clearToken } from "@/lib/storage";

type AuthContextType = {
  token: string | null;
  setAuthToken: (t: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken());

  const setAuthToken = (t: string) => {
    persistToken(t);
    setTokenState(t);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthStore() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore must be used within AuthProvider");
  return ctx;
}