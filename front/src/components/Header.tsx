import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Galerie', page: 'gallery' },
    { label: 'Boutique', page: 'boutique' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className={`font-serif text-xl font-bold ${isScrolled ? 'text-[#111827]' : 'text-white'}`}>
              Events Prestige
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors font-medium ${
                  currentPage === item.page
                    ? 'text-[#8B5CF6]'
                    : isScrolled
                    ? 'text-[#111827] hover:text-[#8B5CF6]'
                    : 'text-white hover:text-[#FBBF24]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('cart')}
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-[#111827] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EC4899] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Demander un devis
            </button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-[#111827]' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 transition-colors ${
                  currentPage === item.page
                    ? 'text-[#8B5CF6] bg-gray-50'
                    : 'text-[#111827] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('cart');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 text-[#111827] hover:bg-gray-50"
            >
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="bg-[#EC4899] text-white text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 mx-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-2 rounded-full font-medium"
              style={{ width: 'calc(100% - 2rem)' }}
            >
              Demander un devis
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
