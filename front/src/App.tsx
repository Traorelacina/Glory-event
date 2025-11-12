import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BoutiquePage from './pages/BoutiquePage';
import CartPage from './pages/CartPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProduitsPage from './pages/AdminProduitsPage';
import AdminCommandesPage from './pages/AdminCommandesPage';
import AdminContactsPage from './pages/AdminContactsPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleNavigate = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setSelectedService(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route
          path="/"
          element={
            <>
              <Header currentPage={currentPage} onNavigate={handleNavigate} />
              {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
              {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
              {currentPage === 'boutique' && <BoutiquePage onNavigate={handleNavigate} />}
              {currentPage === 'cart' && <CartPage onNavigate={handleNavigate} />}
              {currentPage === 'gallery' && <GalleryPage />}
              {currentPage === 'contact' && <ContactPage selectedService={selectedService} />}
            </>
          }
        />

        {/* Pages admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits"
          element={
            <ProtectedRoute>
              <AdminProduitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/commandes"
          element={
            <ProtectedRoute>
              <AdminCommandesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContactsPage />
            </ProtectedRoute>
          }
        />
       
        

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
