import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
