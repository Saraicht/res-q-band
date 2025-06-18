import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Activity, Menu, X } from "lucide-react"
import { Link } from "react-router"

interface NavigationProps {
  currentPage: "landing" | "dashboard"
  onPageChange: (page: "landing" | "dashboard") => void
}

const NavBar = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SARAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => onPageChange("landing")}
              className={`text-sm font-medium transition-colors ${ currentPage === "landing" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              onClick={() => onPageChange("dashboard")}
              className={`text-sm font-medium transition-colors ${ currentPage === "dashboard" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => {
                  onPageChange("landing")
                  setIsMenuOpen(false)
                }}
                className={`text-left text-sm font-medium transition-colors ${ currentPage === "landing" ? "text-blue-600" : "text-gray-600"
                  }`}
              >
                Inicio
              </Link>
              <Link
                to="/dashboard"
                onClick={() => {
                  onPageChange("dashboard")
                  setIsMenuOpen(false)
                }}
                className={`text-left text-sm font-medium transition-colors ${ currentPage === "dashboard" ? "text-blue-600" : "text-gray-600"
                  }`}
              >
                Dashboard
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 w-full">
                Descargar App
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar