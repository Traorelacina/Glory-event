'use client';

import React, { useState } from 'react';
import { ShoppingBag, Star, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  notes: string[];
  inStock: boolean;
  rating: number;
  image: string;
}

export default function BoutiquePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [orderForm, setOrderForm] = useState({
    productId: '',
    productName: '',
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  });
  const [showOrderModal, setShowOrderModal] = useState(false);

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Élégance Royale',
      category: 'Femme',
      price: 35000,
      description: 'Un parfum floral et sophistiqué qui capture l\'essence de l\'élégance.',
      notes: ['Rose', 'Jasmin', 'Vanille'],
      inStock: true,
      rating: 5,
      image: 'elegance-royale'
    },
    {
      id: 'p2',
      name: 'Charme Oriental',
      category: 'Femme',
      price: 42000,
      description: 'Fragrance envoûtante aux notes orientales captivantes.',
      notes: ['Oud', 'Ambre', 'Patchouli'],
      inStock: true,
      rating: 5,
      image: 'charme-oriental'
    },
    {
      id: 'p3',
      name: 'Prestige Masculin',
      category: 'Homme',
      price: 38000,
      description: 'Un parfum viril et raffiné pour l\'homme moderne.',
      notes: ['Bergamote', 'Cèdre', 'Musc'],
      inStock: true,
      rating: 4,
      image: 'prestige-masculin'
    },
    {
      id: 'p4',
      name: 'Mystère Noir',
      category: 'Mixte',
      price: 45000,
      description: 'Une fragrance unisexe mystérieuse et captivante.',
      notes: ['Iris', 'Cuir', 'Santal'],
      inStock: true,
      rating: 5,
      image: 'mystere-noir'
    },
    {
      id: 'p5',
      name: 'Fraîcheur Matinale',
      category: 'Femme',
      price: 32000,
      description: 'Parfum léger et frais, idéal pour le quotidien.',
      notes: ['Citron', 'Fleur d\'oranger', 'Muguet'],
      inStock: true,
      rating: 4,
      image: 'fraicheur-matinale'
    },
    {
      id: 'p6',
      name: 'Bois Précieux',
      category: 'Homme',
      price: 40000,
      description: 'Notes boisées intenses pour une présence affirmée.',
      notes: ['Santal', 'Vétiver', 'Tabac'],
      inStock: false,
      rating: 5,
      image: 'bois-precieux'
    },
  ];

  const categories = ['Tous', 'Femme', 'Homme', 'Mixte'];

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleOrderClick = (product: Product) => {
    setOrderForm({
      ...orderForm,
      productId: product.id,
      productName: product.name
    });
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous intégrerez avec votre backend Laravel
    console.log('Commande soumise:', orderForm);
    alert('Votre commande a été enregistrée ! Nous vous contacterons bientôt.');
    setShowOrderModal(false);
    setOrderForm({
      productId: '',
      productName: '',
      name: '',
      email: '',
      phone: '',
      quantity: 1,
      message: ''
    });
  };

  return (
    <div className="bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-bg-alternate to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold mb-6 text-text-primary">
            Notre Boutique
          </h1>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Découvrez notre collection exclusive de parfums de luxe. 
            Chaque fragrance raconte une histoire unique.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Filter size={20} />
              <span className="font-semibold">Catégorie:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-rose-gold text-white shadow-lg'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product Image Placeholder */}
                <div className="relative h-80 bg-gradient-to-br from-rose-gold-light/30 to-rose-gold/20 flex items-center justify-center overflow-hidden">
                  <div className="text-rose-gold/30 text-6xl font-cursive">
                    {product.name.charAt(0)}
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Épuisé
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-rose-gold font-semibold">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < product.rating ? 'fill-rose-gold text-rose-gold' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-text-primary">
                    {product.name}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-xs text-text-secondary">Notes:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.notes.map((note, index) => (
                        <span
                          key={index}
                          className="text-xs bg-bg-alternate px-3 py-1 rounded-full text-text-secondary"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-3xl font-bold text-rose-gold">
                        {product.price.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-sm text-text-secondary ml-2">FCFA</span>
                    </div>
                    <button
                      onClick={() => handleOrderClick(product)}
                      disabled={!product.inStock}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                        product.inStock
                          ? 'btn-primary'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag size={18} />
                      <span>Commander</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-bg-alternate">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-text-primary">
              Informations de Commande
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="space-y-6 text-text-secondary">
                <div>
                  <h3 className="font-bold text-text-primary mb-2">📦 Livraison</h3>
                  <p>Livraison disponible à Abidjan sous 48-72h. Frais de livraison selon la zone.</p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-2">💳 Paiement</h3>
                  <p>Paiement à la livraison ou par transfert mobile money (Orange Money, MTN Money, Moov Money).</p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-2">🎁 Authenticité</h3>
                  <p>Tous nos parfums sont 100% authentiques et originaux.</p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-2">📞 Support</h3>
                  <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-text-primary">
                  Commander: {orderForm.productName}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-text-secondary hover:text-text-primary text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary font-semibold mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    Quantité *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    Message / Adresse de livraison
                  </label>
                  <textarea
                    rows={4}
                    value={orderForm.message}
                    onChange={(e) => setOrderForm({...orderForm, message: e.target.value})}
                    placeholder="Indiquez votre adresse de livraison et toute information utile..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  ></textarea>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-text-secondary rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary px-6 py-3 rounded-full font-semibold"
                  >
                    Envoyer la commande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}