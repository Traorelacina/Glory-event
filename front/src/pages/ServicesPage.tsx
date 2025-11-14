import { useState } from 'react';
import { Calendar, Users, Award, Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Service } from '../types';
import Footer from '../components/Footer';

interface ServicesPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: 'mariages',
      title: 'Mariages de Luxe',
      description:
        'Transformez le plus beau jour de votre vie en un moment magique et inoubliable. Notre équipe d\'experts orchestre chaque détail avec passion et professionnalisme pour créer une célébration à votre image.',
      image:
        'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'corporate',
      title: 'Événements Corporate',
      description:
        'Donnez à vos événements professionnels une dimension exceptionnelle. Séminaires, lancements de produits, galas d\'entreprise : nous créons des expériences qui marquent les esprits et renforcent votre image de marque.',
      image:
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'receptions',
      title: 'Réceptions Privées',
      description:
        'Anniversaires, fiançailles, baptêmes ou simplement l\'envie de célébrer : nous créons des moments de partage authentiques dans des cadres enchanteurs. Chaque réception est unique, à votre image.',
      image:
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'restauration',
      title: 'Service de Restauration',
      description:
        'Une expérience culinaire raffinée pour sublimer vos événements. Notre chef et son équipe créent des menus sur mesure, alliant créativité et excellence gustative pour émerveiller vos convives.',
      image:
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'decoration',
      title: 'Décoration sur Mesure',
      description:
        'L\'art de créer des ambiances qui racontent votre histoire. Notre équipe de décorateurs talentueux conçoit des univers visuels époustouflants, du concept initial jusqu\'à la réalisation finale.',
      image:
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
  ];

  const icons = {
    mariages: Calendar,
    corporate: Users,
    receptions: Award,
    restauration: Utensils,
    decoration: Sparkles,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#111827] mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des prestations d'excellence pour transformer vos événements en expériences mémorables
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = icons[service.id as keyof typeof icons];
              const isExpanded = selectedService === service.id;

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'ring-2 ring-[#8B5CF6]' : ''
                  }`}
                >
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`relative h-96 md:h-auto ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                        {service.title}
                      </h2>

                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => setSelectedService(isExpanded ? null : service.id)}
                          className="bg-[#F3F4F6] text-[#111827] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                          {isExpanded ? 'Masquer la galerie' : 'Voir la galerie'}
                          <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        <button
                          onClick={() => onNavigate('contact', service.id)}
                          className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                        >
                          Demander un devis
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Galerie Swiper */}
                  {isExpanded && (
                    <div className="p-8 bg-[#F3F4F6] border-t border-gray-200">
                      <h3 className="font-serif text-2xl font-bold text-[#111827] mb-6">
                        Galerie
                      </h3>
                      <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 4 },
                        }}
                      >
                        {service.gallery.map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                              <img
                                src={image}
                                alt={`${service.title} ${idx + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}