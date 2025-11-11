'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    guests: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous intégrerez avec votre backend Laravel
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
    
    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        guests: '',
        budget: '',
        message: ''
      });
    }, 3000);
  };

  const services = [
    'Organisation de Mariage',
    'Wedding Planning',
    'Événement Professionnel',
    'Réception Privée',
    'Décoration',
    'Restauration',
    'Autre'
  ];

  const budgetRanges = [
    'Moins de 500,000 FCFA',
    '500,000 - 1,000,000 FCFA',
    '1,000,000 - 2,000,000 FCFA',
    '2,000,000 - 5,000,000 FCFA',
    'Plus de 5,000,000 FCFA'
  ];

  return (
    <div className="bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-bg-alternate to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold mb-6 text-text-primary">
            Contactez-Nous
          </h1>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Parlons de votre projet. Notre équipe est à votre écoute pour créer 
            l'événement de vos rêves.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-text-primary">
                  Informations de Contact
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Téléphone</h3>
                      <p className="text-text-secondary">+225 XX XX XX XX XX</p>
                      <p className="text-text-secondary">+225 XX XX XX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                      <p className="text-text-secondary">contact@gloryevent.com</p>
                      <p className="text-text-secondary">info@gloryevent.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Adresse</h3>
                      <p className="text-text-secondary">
                        Cocody, Angré 7ème Tranche<br />
                        Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Horaires</h3>
                      <p className="text-text-secondary">
                        Lun - Ven: 9h00 - 18h00<br />
                        Sam: 10h00 - 16h00<br />
                        Dim: Sur rendez-vous
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-bold text-text-primary mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-rose-gold hover:bg-rose-gold-light transition-colors duration-300 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-rose-gold hover:bg-rose-gold-light transition-colors duration-300 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-rose-gold hover:bg-rose-gold-light transition-colors duration-300 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-bg-alternate rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8 text-text-primary">
                  Demande de Devis
                </h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-green-600">
                      Nous vous contacterons dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>

                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Service souhaité *
                        </label>
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                        >
                          <option value="">Sélectionnez un service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Date souhaitée
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-text-secondary font-semibold mb-2">
                          Nombre d'invités
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="Ex: 150"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-2">
                        Budget approximatif
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                      >
                        <option value="">Sélectionnez une fourchette</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-2">
                        Décrivez votre projet *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                        placeholder="Parlez-nous de votre événement, vos attentes, vos idées..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2"
                    >
                      <Send size={20} />
                      <span>Envoyer ma demande</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-bg-alternate">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">
              Visitez Notre Bureau
            </h2>
            <p className="text-lg text-text-secondary">
              Nous sommes situés au cœur d'Abidjan, venez nous rendre visite
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-gold-light/30 to-rose-gold/20 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={64} className="text-rose-gold mx-auto mb-4" />
              <p className="text-xl text-text-secondary">
                Cocody, Angré 7ème Tranche<br />
                Abidjan, Côte d'Ivoire
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}