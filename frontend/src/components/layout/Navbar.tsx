//src/comonents/layout/navbar.tsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useCart } from "@/hooks/useCart";
import { getMe } from "@/services/users.service";

export default function Navbar() {
  const { token, user, setUser, logout } = useAuthStore();
  const { count } = useCart();

  useEffect(() => {
    if (token && !user) {
      (async () => {
        try {
          const me = await getMe();
          setUser(me);
        } catch {
          // si falla, dejamos "usuario" como fallback
        }
      })();
    }
  }, [token, user, setUser]);

  return (
    <nav style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
      <Link to="/">Inicio</Link>
      <Link to="/cart">Carrito ({count})</Link>
      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
        {token ? (
          <>
            <span>
              Hola, <strong>{user?.nombre || user?.email || "usuario"}</strong>
            </span>
            <Link to="/account">Editar perfil</Link>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}