import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>

      {/* Aquí se renderizan las rutas hijas */}
      <Outlet />
    </div>
  );
}