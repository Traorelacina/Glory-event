import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Plus, Search, Trash2, Edit, Loader, AlertCircle, Package } from 'lucide-react';

interface Produit {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export default function AdminProduitsPage() {
  const { token } = useAuthStore();
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    description: '',
    image: '',
    category: '',
    in_stock: true,
    featured: false,
  });

  useEffect(() => {
    fetchProduits();
  }, [token]);

  const fetchProduits = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/produits', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setProduits(data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/produits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la création');

      const data = await response.json();
      setProduits([...produits, data.data]);
      setShowForm(false);
      setFormData({
        name: '',
        slug: '',
        price: '',
        description: '',
        image: '',
        category: '',
        in_stock: true,
        featured: false,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirmer la suppression?')) return;
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/produits/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setProduits(produits.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredProduits = produits.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Package size={36} />
                Gestion Produits
              </h1>
              <p className="text-orange-100 mt-1 text-lg">{produits.length} produits</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl transition shadow-lg font-bold hover:scale-105 duration-300"
            >
              <Plus size={20} />
              Ajouter produit
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-orange-100 border-2 border-orange-400 rounded-lg flex gap-3">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-orange-800 font-medium">{error}</p>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white border-2 border-orange-300 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un produit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nom du produit"
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" />
              <input type="text" placeholder="Slug"
                value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" />
              <input type="number" placeholder="Prix"
                value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" />
              <input type="text" placeholder="Catégorie"
                value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" />
              <input type="text" placeholder="URL image"
                value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" />
              <textarea placeholder="Description"
                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" rows={3} />
              <button
                type="submit"
                className="col-span-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 rounded-lg transition shadow-md font-medium">
                Créer produit
              </button>
            </div>
          </form>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-lg">
            <Loader className="animate-spin text-orange-500 mb-4" size={50} />
            <p className="text-gray-600 font-medium">Chargement des produits...</p>
          </div>
        ) : filteredProduits.length > 0 ? (
          <div className="overflow-x-auto border-2 border-orange-300 rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-100 to-yellow-100 border-b-2 border-orange-300">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Catégorie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Créé</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProduits.map((produit) => (
                  <tr key={produit.id} className="border-b border-orange-200 hover:bg-orange-50 transition">
                    <td className="px-6 py-4 text-gray-800 font-medium">{produit.name}</td>
                    <td className="px-6 py-4 text-orange-600 font-semibold">{Number(produit.price).toFixed(2)}€</td>
                    <td className="px-6 py-4 text-gray-800">{produit.category}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(produit.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-orange-100 rounded-lg transition text-orange-600">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(produit.id)}
                        className="p-2 hover:bg-orange-100 rounded-lg transition text-orange-600"
                      >
                        <Trash2 size={18} />
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
            <p className="text-gray-600 font-medium text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}