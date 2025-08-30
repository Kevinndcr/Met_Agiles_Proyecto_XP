import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProductsListPage from "@/pages/products/ProductsListPage";
import CartPage from "@/pages/cart/CartPage";
import ProfilePage from "@/pages/account/ProfilePage";
import RequireAuth from "./guards/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <ProductsListPage />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      {
        path: "account",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
    ],
  },
]);