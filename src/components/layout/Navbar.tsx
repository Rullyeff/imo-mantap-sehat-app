
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-20 top-0">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-imo-primary flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">IMO</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">IMO MANTAP</h1>
                <p className="text-xs text-gray-600">Ingat Minum Obat</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-imo-primary transition-colors">
              Beranda
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-imo-primary transition-colors">
              Tentang
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-imo-primary transition-colors">
              Kontak
            </Link>
            <Button asChild variant="outline" className="ml-2">
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild className="bg-imo-primary hover:bg-imo-secondary">
              <Link to="/register">Daftar</Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-imo-primary px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-imo-primary px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-imo-primary px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              <div className="flex flex-col space-y-2 px-4">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Masuk</Link>
                </Button>
                <Button asChild className="bg-imo-primary hover:bg-imo-secondary">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Daftar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
