import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <ShoppingBag className={`w-6 h-6 ${isScrolled ? 'text-primary-600' : 'text-primary-600'}`} />
            <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              LuxeShop
            </span>
          </Link>

          <div className="hidden md:block flex-1 mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors relative ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            <Link 
              to="/account" 
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-2">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 font-medium py-2 hover:text-primary-600">
                Home
              </Link>
              <Link to="/shop" className="text-gray-800 font-medium py-2 hover:text-primary-600">
                Shop
              </Link>
              <Link to="/categories" className="text-gray-800 font-medium py-2 hover:text-primary-600">
                Categories
              </Link>
              <Link to="/about" className="text-gray-800 font-medium py-2 hover:text-primary-600">
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;