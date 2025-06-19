import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Menu, X } from "lucide-react";
import { Link } from "react-router";

interface NavigationProps {
  currentPage: "landing" | "dashboard";
  onPageChange: (page: "landing" | "dashboard") => void;
}

const NavBar = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-green-500 p-2">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResQBand</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/"
              onClick={() => onPageChange("landing")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "landing" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              onClick={() => onPageChange("dashboard")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "dashboard" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
              Descargar App
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => {
                  onPageChange("landing");
                  setIsMenuOpen(false);
                }}
                className={`text-left text-sm font-medium transition-colors ${
                  currentPage === "landing" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/dashboard"
                onClick={() => {
                  onPageChange("dashboard");
                  setIsMenuOpen(false);
                }}
                className={`text-left text-sm font-medium transition-colors ${
                  currentPage === "dashboard" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Dashboard
              </Link>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                Descargar App
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
