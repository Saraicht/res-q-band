// routes/router.tsx
import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts";
import HomePage from "@/pages/home";
import DashboardPage from "@/pages/dashboard";
// import LoadingPage from "@/pages/loading";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
    ],
    // loader: LoadingPage
  },
]);
