// pages/BoutiquePage.tsx
import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Loader, AlertCircle, Eye } from "lucide-react";
import { useCartStore, Product } from "../store/cartStore";
import ProductDetailModal from "../components/ProductDetailModal";
import Footer from "../components/Footer";

interface BoutiquePageProps {
  onNavigate: (page: string) => void;
}

// API URL
const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage';

export default function BoutiquePage({ onNavigate }: BoutiquePageProps) {
  const { addItem, getTotalItems } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/produits`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setProducts(data.data);
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion au serveur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STORAGE_URL}/${imagePath}`;
  };

  const getFallbackImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Non Disponible%3C/text%3E%3C/svg%3E';
  };

  const categories = ["Tous", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(
    (p) => selectedCategory === "Tous" || p.category === selectedCategory
  );

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white via-purple-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Boutique Parfums
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de fragrances d'exception
            </p>

            {/* CATEGORIES */}
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-300"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ERREUR */}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-4 shadow-sm">
              <AlertCircle className="text-red-600 flex-shrink-0" size={28} />
              <div className="flex-1">
                <p className="text-red-800 font-semibold text-lg">{error}</p>
                <button 
                  onClick={fetchProducts}
                  className="text-red-600 underline text-sm mt-2 hover:text-red-700 font-medium"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader className="animate-spin text-purple-600 mb-6" size={56} />
              <p className="text-gray-600 font-medium text-xl">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-xl">
              <ShoppingCart className="mx-auto text-gray-300 mb-6" size={80} />
              <p className="text-gray-700 font-semibold text-2xl mb-3">Aucun produit disponible</p>
              <p className="text-gray-500 text-lg">
                {selectedCategory !== "Tous" 
                  ? `Aucun produit dans la catégorie "${selectedCategory}"`
                  : "Vérifiez votre connexion ou contactez l'administrateur"
                }
              </p>
            </div>
          ) : (
            <>
              {/* GRID PRODUITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = getFallbackImage();
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Vedette
                        </div>
                      )}

                      {!product.in_stock && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          Rupture
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="mb-3">
                        <span className="inline-block bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                          {Number(product.price).toLocaleString('fr-FR')} FCFA
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.in_stock}
                          className={`p-3 rounded-full transform transition-all ${
                            product.in_stock
                              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-xl hover:scale-110 active:scale-95'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      {/* BOUTON DÉTAIL */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                        Voir les détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* MODAL PRODUIT */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          getImageUrl={getImageUrl}
          getFallbackImage={getFallbackImage}
        />
      </div>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />
    </>
  );
}