'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Users, X, Play } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  guests: number;
  description: string;
  type: 'image' | 'video';
  thumbnail: string;
}

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 'e1',
      title: 'Mariage Royal - Famille Kouassi',
      date: '15 Juin 2024',
      location: 'Hôtel Ivoire, Abidjan',
      category: 'Mariage',
      guests: 300,
      description: 'Un mariage somptueux célébrant l\'union de deux familles dans un cadre luxueux. Décoration florale élaborée, cuisine gastronomique et animations musicales exceptionnelles.',
      type: 'image',
      thumbnail: 'mariage-royal'
    },
    {
      id: 'e2',
      title: 'Conférence Tech Summit 2024',
      date: '3 Avril 2024',
      location: 'Sofitel Abidjan',
      category: 'Professionnel',
      guests: 500,
      description: 'Organisation complète d\'une conférence technologique internationale avec 500 participants, incluant la gestion audiovisuelle, restauration et coordination des intervenants.',
      type: 'image',
      thumbnail: 'conference-tech'
    },
    {
      id: 'e3',
      title: 'Vidéo - Wedding Highlights',
      date: '20 Mai 2024',
      location: 'Assinie',
      category: 'Mariage',
      guests: 150,
      description: 'Moments magiques capturés lors d\'un mariage intime en bord de mer. Cérémonie émouvante suivie d\'une réception élégante sous les étoiles.',
      type: 'video',
      thumbnail: 'video-wedding'
    },
    {
      id: 'e4',
      title: 'Gala Corporatif - Banque Atlantique',
      date: '12 Mars 2024',
      location: 'Pullman Abidjan',
      category: 'Professionnel',
      guests: 250,
      description: 'Soirée de gala corporate avec dîner assis, spectacles et remise de prix. Ambiance sophistiquée et décoration sur le thème "Excellence et Innovation".',
      type: 'image',
      thumbnail: 'gala-corporate'
    },
    {
      id: 'e5',
      title: 'Cérémonie Traditionnelle',
      date: '8 Février 2024',
      location: 'Grand-Bassam',
      category: 'Mariage',
      guests: 400,
      description: 'Célébration traditionnelle ivoirienne authentique avec décoration culturelle, tenues traditionnelles et animations folkloriques.',
      type: 'image',
      thumbnail: 'ceremonie-traditionnelle'
    },
    {
      id: 'e6',
      title: 'Anniversaire de Luxe',
      date: '25 Janvier 2024',
      location: 'Villa Privée, Cocody',
      category: 'Réception',
      guests: 100,
      description: 'Célébration privée d\'anniversaire avec décoration thématique, buffet gastronomique et animations musicales pour une soirée mémorable.',
      type: 'image',
      thumbnail: 'anniversaire-luxe'
    },
    {
      id: 'e7',
      title: 'Vidéo - Behind the Scenes',
      date: '10 Mars 2024',
      location: 'Divers lieux',
      category: 'Tous',
      guests: 0,
      description: 'Découvrez les coulisses de notre travail : de la préparation à la réalisation, notre équipe en action pour créer des événements parfaits.',
      type: 'video',
      thumbnail: 'video-bts'
    },
    {
      id: 'e8',
      title: 'Lancement de Produit',
      date: '18 Décembre 2023',
      location: 'Espace Latrille',
      category: 'Professionnel',
      guests: 200,
      description: 'Organisation d\'un événement de lancement de produit avec présentation audiovisuelle, cocktail dînatoire et animations interactives.',
      type: 'image',
      thumbnail: 'lancement-produit'
    },
  ];

  const categories = ['Tous', 'Mariage', 'Professionnel', 'Réception'];

  const filteredEvents = selectedCategory === 'Tous'
    ? events
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-bg-alternate to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold mb-6 text-text-primary">
            Notre Galerie
          </h1>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Découvrez nos plus belles réalisations à travers photos et vidéos. 
            Chaque événement raconte une histoire unique.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
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
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative aspect-[4/3] bg-gradient-to-br from-rose-gold-light/30 to-rose-gold/20 rounded-lg overflow-hidden cursor-pointer"
              >
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-cursive text-rose-gold/30">
                  {event.title.charAt(0)}
                </div>

                {/* Video Indicator */}
                {event.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-rose-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    {event.guests > 0 && (
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{event.guests}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-text-primary hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Event Image/Video Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-rose-gold-light/30 to-rose-gold/20 flex items-center justify-center">
                <div className="text-9xl font-cursive text-rose-gold/30">
                  {selectedEvent.title.charAt(0)}
                </div>
                {selectedEvent.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-rose-gold rounded-full flex items-center justify-center">
                      <Play size={36} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-8">
                <div className="mb-6">
                  <span className="inline-block bg-rose-gold text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-4xl font-bold text-text-primary mb-4">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-6 text-text-secondary">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-rose-gold" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={18} className="text-rose-gold" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    {selectedEvent.guests > 0 && (
                      <div className="flex items-center space-x-2">
                        <Users size={18} className="text-rose-gold" />
                        <span>{selectedEvent.guests} invités</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="btn-primary px-8 py-3 rounded-full font-semibold"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-bg-alternate">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-text-primary">
            Créons Ensemble Votre Prochain Événement
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Inspiré par nos réalisations ? Contactez-nous pour discuter de votre projet.
          </p>
          <a
            href="/contact"
            className="btn-primary px-8 py-4 rounded-full text-lg font-semibold inline-block"
          >
            Planifier mon événement
          </a>
        </div>
      </section>
    </div>
  );
}