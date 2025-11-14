import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Search, Loader, AlertCircle, Eye, Package, X, Check, Clock, Truck, XCircle } from 'lucide-react';

interface Produit {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Commande {
  id: number;
  numero?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  total: number;
  status?: string;
  created_at: string;
  produits?: Produit[];
}

// API URLs
const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage';

export default function AdminCommandesPage() {
  const { token } = useAuthStore();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('');
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetchCommandes();
  }, [token]);

  const fetchCommandes = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/commandes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      console.log('Données commandes:', data);
      setCommandes(data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommandeDetails = async (id: number) => {
    if (!token) return;
    try {
      setUpdateError(null);
      const response = await fetch(`${API_URL}/admin/commandes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des détails');

      const data = await response.json();
      console.log('Détails commande:', data);
      setSelectedCommande(data.data || data);
      setIsModalOpen(true);
    } catch (err: any) {
      setUpdateError(err.message);
    }
  };

  const updateCommandeStatus = async (id: number, newStatus: string) => {
    if (!token) return;
    try {
      setIsUpdating(true);
      setUpdateError(null);

      const response = await fetch(`${API_URL}/admin/commandes/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la mise à jour');
      }

      const data = await response.json();
      
      // Mettre à jour la commande dans la liste
      setCommandes(prev => 
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );

      // Mettre à jour la commande sélectionnée
      if (selectedCommande) {
        setSelectedCommande({ ...selectedCommande, status: newStatus });
      }

      setUpdateError(null);
    } catch (err: any) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Fonction pour obtenir l'URL complète de l'image
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STORAGE_URL}/${imagePath}`;
  };

  // Image de secours en SVG
  const getFallbackImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'livree':
      case 'livré':
        return 'bg-green-100 text-green-700 border-2 border-green-400';
      case 'en_cours':
        return 'bg-blue-100 text-blue-700 border-2 border-blue-400';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400';
      case 'annulee':
      case 'annulée':
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
    return labels[statut] || statut || 'N/A';
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'livree':
      case 'livré':
        return <Check size={20} />;
      case 'en_cours':
        return <Truck size={20} />;
      case 'en_attente':
        return <Clock size={20} />;
      case 'annulee':
      case 'annulée':
        return <XCircle size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  // Filtrage sécurisé avec vérifications
  const filteredCommandes = commandes.filter((c) => {
    const numero = c.numero || c.id?.toString() || '';
    const client = c.client_name || '';
    const email = c.client_email || '';
    const statut = c.status || 'en_attente';

    const matchesSearch = 
      numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatut = !filterStatut || statut === filterStatut;

    return matchesSearch && matchesStatut;
  });

  // Extraction des statuts uniques
  const statuts = Array.from(
    new Set(commandes.map((c) => c.status || 'en_attente'))
  );

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
                <p className="text-2xl font-bold">
                  {commandes.filter(c => (c.status || 'en_attente') === 'en_attente').length}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border-2 border-white border-opacity-30">
                <p className="text-sm text-orange-100 mb-1">Total CA</p>
                <p className="text-2xl font-bold">
                  {Number(commandes.reduce((sum, c) => sum + (Number(c.total) || 0), 0)).toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl shadow-lg flex gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <p className="text-orange-900 font-semibold text-lg mb-1">Erreur</p>
              <p className="text-orange-700">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-orange-600 hover:text-orange-800"
            >
              <X size={20} />
            </button>
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
                    <td className="px-6 py-4 font-bold text-gray-800">
                      #{commande.numero || commande.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {commande.client_name || 'N/A'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {commande.client_email || 'N/A'}
                        </p>
                        {commande.client_phone && (
                          <p className="text-gray-500 text-xs mt-1">
                            📞 {commande.client_phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-orange-600 font-bold text-lg">
                      {Number(commande.total || 0).toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${getStatutColor(commande.status || 'en_attente')}`}>
                        {getStatutIcon(commande.status || 'en_attente')}
                        {getStatutLabel(commande.status || 'en_attente')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                      {new Date(commande.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => fetchCommandeDetails(commande.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition text-orange-600 font-medium"
                      >
                        <Eye size={18} />
                        Voir
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
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm || filterStatut 
                ? 'Essayez de modifier vos filtres de recherche' 
                : 'Les commandes apparaîtront ici'}
            </p>
          </div>
        )}
      </div>

      {/* MODAL DÉTAILS COMMANDE - VERSION AMÉLIORÉE */}
      {isModalOpen && selectedCommande && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl mx-auto overflow-hidden shadow-2xl my-4 relative">
            {/* Bouton fermeture */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedCommande(null);
                setUpdateError(null);
              }}
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-gray-700 hover:text-black transition z-10 shadow-lg"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-1">
                Commande #{selectedCommande.numero || selectedCommande.id}
              </h2>
              <p className="text-orange-100 text-sm">
                {new Date(selectedCommande.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
              {updateError && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                  <p className="text-red-800 text-sm flex-1">{updateError}</p>
                  <button 
                    onClick={() => setUpdateError(null)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Informations client */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Informations client</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nom</p>
                    <p className="text-gray-900 font-semibold text-sm">{selectedCommande.client_name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900 font-semibold text-sm break-all">{selectedCommande.client_email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Téléphone</p>
                    <p className="text-gray-900 font-semibold text-sm">{selectedCommande.client_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Statut actuel</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatutColor(selectedCommande.status || 'en_attente')}`}>
                      {getStatutIcon(selectedCommande.status || 'en_attente')}
                      {getStatutLabel(selectedCommande.status || 'en_attente')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Produits commandés */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Produits commandés</h3>
                <div className="space-y-2">
                  {selectedCommande.produits && selectedCommande.produits.length > 0 ? (
                    selectedCommande.produits.map((produit) => (
                      <div key={produit.id} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3">
                        <img
                          src={getImageUrl(produit.image)}
                          alt={produit.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = getFallbackImage();
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{produit.name}</h4>
                          <p className="text-gray-600 text-xs">Quantité: {produit.quantity}</p>
                          <div className="flex justify-between items-center mt-1">
                            <div>
                              <p className="text-xs text-gray-600">Prix unitaire</p>
                              <p className="font-bold text-orange-600 text-sm">
                                {Number(produit.price).toLocaleString('fr-FR')} FCFA
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Sous-total</p>
                              <p className="font-bold text-gray-900 text-sm">
                                {Number(produit.price * produit.quantity).toLocaleString('fr-FR')} FCFA
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4 text-sm">Aucun produit disponible</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    {Number(selectedCommande.total || 0).toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              {/* Actions de changement de statut */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Changer le statut</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => updateCommandeStatus(selectedCommande.id, 'en_attente')}
                    disabled={isUpdating || selectedCommande.status === 'en_attente'}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg font-medium text-xs transition ${
                      selectedCommande.status === 'en_attente'
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-400 cursor-not-allowed'
                        : 'bg-white border border-yellow-400 text-yellow-700 hover:bg-yellow-50'
                    } disabled:opacity-50`}
                  >
                    <Clock size={14} />
                    En attente
                  </button>
                  <button
                    onClick={() => updateCommandeStatus(selectedCommande.id, 'en_cours')}
                    disabled={isUpdating || selectedCommande.status === 'en_cours'}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg font-medium text-xs transition ${
                      selectedCommande.status === 'en_cours'
                        ? 'bg-blue-100 text-blue-700 border border-blue-400 cursor-not-allowed'
                        : 'bg-white border border-blue-400 text-blue-700 hover:bg-blue-50'
                    } disabled:opacity-50`}
                  >
                    <Truck size={14} />
                    En cours
                  </button>
                  <button
                    onClick={() => updateCommandeStatus(selectedCommande.id, 'livree')}
                    disabled={isUpdating || selectedCommande.status === 'livree'}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg font-medium text-xs transition ${
                      selectedCommande.status === 'livree'
                        ? 'bg-green-100 text-green-700 border border-green-400 cursor-not-allowed'
                        : 'bg-white border border-green-400 text-green-700 hover:bg-green-50'
                    } disabled:opacity-50`}
                  >
                    <Check size={14} />
                    Livrée
                  </button>
                  <button
                    onClick={() => updateCommandeStatus(selectedCommande.id, 'annulee')}
                    disabled={isUpdating || selectedCommande.status === 'annulee'}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg font-medium text-xs transition ${
                      selectedCommande.status === 'annulee'
                        ? 'bg-red-100 text-red-700 border border-red-400 cursor-not-allowed'
                        : 'bg-white border border-red-400 text-red-700 hover:bg-red-50'
                    } disabled:opacity-50`}
                  >
                    <XCircle size={14} />
                    Annulée
                  </button>
                </div>
                {isUpdating && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-orange-600 text-sm">
                    <Loader className="animate-spin" size={16} />
                    <span className="font-medium">Mise à jour...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}