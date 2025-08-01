import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { ListPage } from "./pages/Car/ListPage";
import { CreatePage } from "./pages/Car/CreatePage";
import { Register } from "./pages/Auth/Page/Register";
import { Login } from "./pages/Auth/Page/Login";
import { RequireAuth } from "./pages/Auth/Middleware/RequireAuth";

export const router = createBrowserRouter([
  {
    Component: RequireAuth,
    children: [
      {
        path: "/car",
        Component: Layout,
        children: [
          {
            path: "",
            Component: ListPage,
          },
          {
            path: "create",
            Component: CreatePage,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  }
]);
