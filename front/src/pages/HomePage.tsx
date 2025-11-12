'use client';

import { Sparkles, Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Calendar,
      title: 'Mariages de Luxe',
      description: 'Des cérémonies inoubliables orchestrées avec élégance et raffinement',
      color: 'from-[#8B5CF6] to-[#EC4899]',
      img: 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Users,
      title: 'Événements Corporate',
      description: "Solutions professionnelles pour vos séminaires et réceptions d'entreprise",
      color: 'from-[#FBBF24] to-[#F59E0B]',
      img: 'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Award,
      title: 'Réceptions Privées',
      description: 'Créez des moments mémorables pour vos célébrations personnelles',
      color: 'from-[#EC4899] to-[#8B5CF6]',
      img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Sparkles,
      title: 'Décoration sur Mesure',
      description: 'Ambiances uniques adaptées à votre vision et votre style',
      color: 'from-[#8B5CF6] to-[#FBBF24]',
      img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      text: 'Une équipe exceptionnelle qui a transformé notre mariage en un conte de fées. Chaque détail était parfait.',
    },
    {
      id: '2',
      name: 'Jean Dupont',
      text: 'Professionnalisme et créativité au rendez-vous. Notre événement corporate a été un véritable succès.',
    },
    {
      id: '3',
      name: 'Marie Laurent',
      text: 'Des prestations haut de gamme et une écoute attentive. Je recommande sans hésitation!',
    },
  ];

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#111827]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Créons Ensemble des
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#EC4899] animate-text-gradient">
              Moments Inoubliables
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Votre événement mérite l'excellence. Nous transformons vos rêves en réalité avec créativité et professionnalisme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-3 rounded-full font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Demander un devis
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-white/20 transition-all border border-white/30"
            >
              Découvrir nos services
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Nos Services Premium
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des prestations sur mesure pour faire de votre événement un moment d'exception
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition-all"
                onClick={() => onNavigate('services')}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-6 bg-white/80 relative z-10">
                  <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-700 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Témoignages de nos Clients
            </h2>
            <p className="text-xl text-gray-600">Leur satisfaction est notre plus belle récompense</p>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={windowWidth < 768 ? 1 : 3}
            loop
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#111827]">{testimonial.name}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Boutique Section */}
      <section className="py-12 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Découvrez notre Collection de Parfums
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Des fragrances exclusives pour sublimer vos événements et créer une ambiance unique
          </p>
          <button
            onClick={() => onNavigate('boutique')}
            className="bg-white text-[#8B5CF6] px-6 py-3 rounded-full font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Explorer la boutique
          </button>
        </div>
      </section>
    </div>
  );
}
