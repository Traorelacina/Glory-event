import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Search, Loader, AlertCircle, Eye, Package, TrendingUp } from 'lucide-react';

interface Commande {
  id: number;
  numero: string;
  client: string;
  email: string;
  total: number;
  statut: string;
  created_at: string;
}

export default function AdminCommandesPage() {
  const { token } = useAuthStore();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('');

  useEffect(() => {
    fetchCommandes();
  }, [token]);

  const fetchCommandes = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/commandes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setCommandes(data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'livree':
        return 'bg-green-100 text-green-700 border-2 border-green-400';
      case 'en_cours':
        return 'bg-blue-100 text-blue-700 border-2 border-blue-400';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400';
      case 'annulee':
        return 'bg-red-100 text-red-700 border-2 border-red-400';
      default:
        return 'bg-gray-100 text-gray-700 border-2 border-gray-400';
    }
  };

  const getStatutLabel = (statut: string) => {
    const labels: Record<string, string> = {
      livree: 'Livrée',
      en_cours: 'En cours',
      en_attente: 'En attente',
      annulee: 'Annulée',
    };
    return labels[statut] || statut;
  };

  const filteredCommandes = commandes.filter(
    (c) =>
      (c.numero.includes(searchTerm) ||
        c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterStatut || c.statut === filterStatut)
  );

  const statuts = Array.from(new Set(commandes.map((c) => c.statut)));

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header avec statistiques */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Package size={36} />
                Gestion Commandes
              </h1>
              <p className="text-orange-100 mt-1 text-lg">{commandes.length} commandes au total</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border-2 border-white border-opacity-30">
                <p className="text-sm text-orange-100 mb-1">En attente</p>
                <p className="text-2xl font-bold">{commandes.filter(c => c.statut === 'en_attente').length}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border-2 border-white border-opacity-30">
                <p className="text-sm text-orange-100 mb-1">Total CA</p>
                <p className="text-2xl font-bold">{commandes.reduce((sum, c) => sum + c.total, 0).toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl shadow-lg flex gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-orange-900 font-semibold text-lg mb-1">Erreur</p>
              <p className="text-orange-700">{error}</p>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par numéro, client ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-medium"
            >
              <option value="">Tous les statuts</option>
              {statuts.map((statut) => (
                <option key={statut} value={statut}>
                  {getStatutLabel(statut)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-lg">
            <Loader className="animate-spin text-orange-500 mb-4" size={50} />
            <p className="text-gray-600 font-medium">Chargement des commandes...</p>
          </div>
        ) : filteredCommandes.length > 0 ? (
          <div className="overflow-x-auto border-2 border-orange-300 rounded-xl shadow-lg bg-white">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-100 to-yellow-100 border-b-2 border-orange-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">N° Commande</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommandes.map((commande) => (
                  <tr key={commande.id} className="border-b border-orange-200 hover:bg-orange-50 transition">
                    <td className="px-6 py-4 font-bold text-gray-800">{commande.numero}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-800 font-semibold">{commande.client}</p>
                        <p className="text-gray-600 text-sm">{commande.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-orange-600 font-bold text-lg">{commande.total.toFixed(2)}€</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${getStatutColor(commande.statut)}`}>
                        {getStatutLabel(commande.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm font-medium">{new Date(commande.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-orange-100 rounded-lg transition text-orange-600 font-medium">
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-orange-200">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium text-lg">Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}