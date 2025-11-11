'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'L\'Excellence à Chaque Événement',
    subtitle: 'Organisation premium de mariages et événements professionnels',
    image: '/images/hero/hero-1.jpg',
    cta: 'Découvrir nos services',
    ctaLink: '/services',
  },
  {
    id: 2,
    title: 'Créons Ensemble Votre Jour Parfait',
    subtitle: 'Wedding planning et décoration sur-mesure',
    image: '/images/hero/hero-2.jpg',
    cta: 'Nos réalisations',
    ctaLink: '/portfolio',
  },
  {
    id: 3,
    title: 'Parfums de Luxe & Élégance',
    subtitle: 'Découvrez notre collection exclusive de fragrances',
    image: '/images/hero/hero-3.jpg',
    cta: 'Boutique',
    ctaLink: '/boutique',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container-custom">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-secondary animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                  <Link
                    href={slide.ctaLink}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-secondary w-12'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <svg
          className="w-6 h-6 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}