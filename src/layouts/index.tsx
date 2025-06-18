import NavBar from "@/components/nav-bar";
import { useState } from "react";
import { Outlet } from "react-router";

export default function RootLayout() {

  const [currentPage, setCurrentPage] = useState<"landing" | "dashboard">("landing")

  return (
    <>
      <NavBar currentPage={currentPage} onPageChange={setCurrentPage} />
      <Outlet />
    </>
  );
}
