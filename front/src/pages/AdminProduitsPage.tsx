import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Plus, Search, Trash2, Edit, Loader, AlertCircle, Package, Upload, X } from 'lucide-react';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    in_stock: true,
    featured: false,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProduits();
  }, [token]);

  const fetchProduits = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/produits', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProduits(data.data || []);
      setError(null);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 2MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Format d\'image non supporté. Utilisez JPEG, PNG, GIF ou WebP.');
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Token d\'authentification manquant');
      return;
    }

    if (!selectedImage) {
      setError('Veuillez sélectionner une image');
      return;
    }

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category.trim());
      formDataToSend.append('in_stock', formData.in_stock ? '1' : '0');
      formDataToSend.append('featured', formData.featured ? '1' : '0');
      formDataToSend.append('image', selectedImage);

      console.log('Sending product:', {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        image: selectedImage.name
      });

      const response = await fetch('http://127.0.0.1:8000/api/admin/produits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 300));
        throw new Error('Le serveur a retourné une réponse invalide. Vérifiez que la route API est correcte.');
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || `Erreur ${response.status}`);
      }

      console.log('Product created:', data);

      setProduits(prev => [data.data, ...prev]);
      setShowForm(false);
      resetForm();
      setError(null);
      
    } catch (err: any) {
      console.error('Create product error:', err);
      setError(err.message || 'Erreur lors de la création du produit');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      in_stock: true,
      featured: false,
    });
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirmer la suppression?')) return;
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/produits/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Erreur ${response.status}`);
      }

      setProduits(produits.filter((p) => p.id !== id));
      setError(null);
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
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) resetForm();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl transition shadow-lg font-bold hover:scale-105 duration-300"
            >
              <Plus size={20} />
              {showForm ? 'Annuler' : 'Ajouter produit'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-red-800 font-medium mb-1">Erreur</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white border-2 border-orange-300 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un produit</h2>
            
            {/* Upload d'image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image du produit <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="max-h-48 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 mb-2">Cliquez pour sélectionner une image</p>
                    <p className="text-sm text-gray-500">JPEG, PNG, GIF, WebP - Max 2MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  {imagePreview ? 'Changer l\'image' : 'Sélectionner une image'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Nom du produit"
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (FCFA) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  placeholder="Prix"
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Catégorie"
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-7">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">En stock</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">En vedette</span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Description du produit"
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none" 
                  rows={3} 
                  required
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={!selectedImage || submitting}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg transition shadow-md font-medium disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Créer le produit
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                    setError(null);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Recherche */}
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

        {/* Liste des produits */}
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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Catégorie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Créé</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProduits.map((produit) => (
                  <tr key={produit.id} className="border-b border-orange-200 hover:bg-orange-50 transition">
                    <td className="px-6 py-4">
                      <img 
                        src={`http://127.0.0.1:8000/storage/${produit.image}`} 
                        alt={produit.name}
                        className="w-16 h-16 object-cover rounded-lg shadow"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{produit.name}</td>
                    <td className="px-6 py-4 text-orange-600 font-semibold">{Number(produit.price).toFixed(0)} FCFA</td>
                    <td className="px-6 py-4 text-gray-800">{produit.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        produit.in_stock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {produit.in_stock ? 'En stock' : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(produit.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-orange-100 rounded-lg transition text-orange-600">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(produit.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
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
            {searchTerm && (
              <p className="text-gray-500 text-sm mt-2">Essayez avec un autre terme de recherche</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}