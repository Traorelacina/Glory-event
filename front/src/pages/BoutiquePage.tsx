import { useState } from "react";
import { ShoppingCart, Plus, Eye, X } from "lucide-react";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BoutiquePageProps {
  onNavigate: (page: string) => void;
}

export default function BoutiquePage({ onNavigate }: BoutiquePageProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const products: Product[] = [
    {
      id: "1",
      name: "Essence Royale",
      price: 89.99,
      category: "Femme",
      image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Un parfum sophistiqué aux notes de jasmin et de bois de santal. Élégance intemporelle.",
      gallery: [
        "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/965988/pexels-photo-965988.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: "2",
      name: "Nuit Étoilée",
      price: 79.99,
      category: "Homme",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Des notes florales mystérieuses pour des soirées inoubliables. Sensualité et raffinement.",
      gallery: [
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: "3",
      name: "Velours Noir",
      price: 99.99,
      category: "Tous",
      image: "https://images.pexels.com/photos/3978594/pexels-photo-3978594.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Intense et envoûtant, ce parfum évoque le luxe absolu. Notes de cuir et d'épices.",
      gallery: [
        "https://images.pexels.com/photos/3978594/pexels-photo-3978594.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3738388/pexels-photo-3738388.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: "4",
      name: "Horizon Bleu",
      price: 89.99,
      category: "Homme",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Notes marines et boisées pour un esprit libre. Fraîcheur océanique et mystère.",
      gallery: [
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
  ];

  const filteredProducts = products.filter(
    (p) => selectedCategory === "Tous" || p.category === selectedCategory
  );

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#111827] mb-4">
            Boutique Parfums
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre collection exclusive de fragrances d’exception
          </p>

          {/* CATEGORIES */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {["Tous", "Homme", "Femme"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID PRODUITS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full text-[#8B5CF6] hover:bg-white transition"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-[#111827] mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mb-2">Catégorie: {product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#8B5CF6]">
                    {product.price.toFixed(2)}€
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white p-2 rounded-full hover:shadow-lg transform hover:scale-110 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA PANIER */}
        <div className="mt-20 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-3xl p-8 md:p-12 text-white text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Votre Panier est Prêt ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Finalisez votre commande et recevez vos parfums directement chez vous
          </p>
          <button
            onClick={() => onNavigate("cart")}
            className="bg-white text-[#8B5CF6] px-8 py-4 rounded-full font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Voir mon panier
          </button>
        </div>
      </div>

      {/* MODAL PRODUIT */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fadeIn relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-700 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-80"
            >
              {selectedProduct.gallery?.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${selectedProduct.name}-${i}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="p-8">
              <h2 className="font-serif text-3xl font-bold mb-3 text-[#111827]">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              <p className="text-gray-500 text-sm mb-4">Catégorie: {selectedProduct.category}</p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[#8B5CF6]">
                  {selectedProduct.price.toFixed(2)}€
                </span>
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
