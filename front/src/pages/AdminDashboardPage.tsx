import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { adminApi } from '../../services/api';
import { Loader, AlertCircle, Briefcase, Package, ShoppingCart, Clock, Mail, Image, TrendingUp, Activity } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface DashboardStats {
  total_services: number;
  total_produits: number;
  total_commandes: number;
  commandes_en_attente: number;
  total_contacts: number;
  total_portfolio: number;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getDashboard(token);
        setStats(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement du dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Activity className="animate-pulse" size={40} />
                Dashboard
              </h1>
              <p className="text-orange-100 text-lg">Vue d'ensemble de votre plateforme événementielle</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border-2 border-white border-opacity-30">
                <p className="text-sm text-orange-100 mb-1">Dernière mise à jour</p>
                <p className="text-lg font-semibold">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl shadow-lg flex gap-4 animate-pulse">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-orange-900 font-semibold text-lg mb-1">Erreur de chargement</p>
              <p className="text-orange-700">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg">
            <Loader className="animate-spin text-orange-500 mb-4" size={50} />
            <p className="text-gray-600 font-medium">Chargement des statistiques...</p>
          </div>
        ) : stats ? (
          <>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard 
                label="Services" 
                value={stats.total_services} 
                icon={Briefcase}
                color="orange"
                subtitle="Services actifs"
              />
              <StatCard 
                label="Produits" 
                value={stats.total_produits} 
                icon={Package}
                color="yellow"
                subtitle="Parfums en catalogue"
              />
              <StatCard 
                label="Commandes" 
                value={stats.total_commandes} 
                icon={ShoppingCart}
                color="orange"
                subtitle="Commandes totales"
              />
              <StatCard 
                label="En attente" 
                value={stats.commandes_en_attente} 
                icon={Clock}
                color="yellow"
                subtitle="À traiter"
                highlight={true}
              />
              <StatCard 
                label="Contacts" 
                value={stats.total_contacts} 
                icon={Mail}
                color="orange"
                subtitle="Demandes reçues"
              />
              <StatCard 
                label="Portfolio" 
                value={stats.total_portfolio} 
                icon={Image}
                color="yellow"
                subtitle="Réalisations"
              />
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <TrendingUp className="text-orange-500" size={28} />
                Actions rapides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickActionButton 
                  label="Gérer les produits"
                  href="/admin/produits"
                  icon={Package}
                />
                <QuickActionButton 
                  label="Voir les commandes"
                  href="/admin/commandes"
                  icon={ShoppingCart}
                />
                <QuickActionButton 
                  label="Consulter contacts"
                  href="/admin/contacts"
                  icon={Mail}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: any;
  color: 'orange' | 'yellow';
  subtitle?: string;
  highlight?: boolean;
}

function StatCard({ label, value, icon: Icon, color, subtitle, highlight }: StatCardProps) {
  const bgGradient = color === 'yellow' 
    ? 'from-yellow-50 to-orange-50' 
    : 'from-orange-50 to-yellow-50';
  
  const iconBg = color === 'yellow'
    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500'
    : 'bg-gradient-to-br from-orange-400 to-orange-500';
  
  const textColor = color === 'yellow' ? 'text-yellow-600' : 'text-orange-600';
  
  const borderColor = highlight 
    ? 'border-yellow-400 shadow-yellow-200' 
    : color === 'yellow' 
      ? 'border-yellow-300' 
      : 'border-orange-300';

  return (
    <div className={`bg-gradient-to-br ${bgGradient} border-2 ${borderColor} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${highlight ? 'ring-4 ring-yellow-200 animate-pulse' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} p-3 rounded-xl shadow-md`}>
          <Icon className="text-white" size={24} />
        </div>
        {highlight && (
          <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            URGENT
          </span>
        )}
      </div>
      <p className="text-gray-700 text-sm font-semibold mb-1 uppercase tracking-wide">{label}</p>
      <p className={`${textColor} text-4xl font-bold mb-2`}>{value}</p>
      {subtitle && (
        <p className="text-gray-600 text-sm">{subtitle}</p>
      )}
    </div>
  );
}

interface QuickActionButtonProps {
  label: string;
  href: string;
  icon: any;
}

function QuickActionButton({ label, href, icon: Icon }: QuickActionButtonProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
    >
      <Icon size={20} />
      {label}
    </a>
  );
}