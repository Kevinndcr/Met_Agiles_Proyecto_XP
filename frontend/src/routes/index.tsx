import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

const WIP = ({ name }: { name: string }) => (
  <div style={{ padding: 24 }}>
    <h2>{name} — En construcción</h2>
    <p>Pronto estará disponible.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "products/:id", element: <WIP name="ProductDetailPage" /> },
      { path: "cart", element: <WIP name="CartPage" /> },
      { path: "orders", element: <WIP name="OrdersListPage" /> },
      { path: "orders/:id", element: <WIP name="OrderDetailPage" /> },
    ],
  },
]);