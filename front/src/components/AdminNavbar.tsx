import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { LogOut, Home, Box, ShoppingCart, Mail, Image, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/produits', label: 'Produits', icon: Box },
    { path: '/admin/commandes', label: 'Commandes', icon: ShoppingCart },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
    
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b-4 border-orange-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Admin</h1>
            <span className="text-gray-600 text-sm font-medium">v1.0</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                  isActive(path)
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-gray-800 text-sm font-medium">{admin?.name}</p>
              <p className="text-gray-500 text-xs">{admin?.role_label}</p>
            </div>

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition text-sm font-medium shadow-md"
            >
              <LogOut size={18} />
              Déconnexion
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition"
            >
              {isOpen ? (
                <X className="text-orange-600" size={24} />
              ) : (
                <Menu className="text-orange-600" size={24} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                  isActive(path)
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition text-sm font-medium shadow-md"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}