'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function EvenementielPage() {
  const [activeFeature, setActiveFeature] = useState<'center' | 'split'>('center');
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: '🎯',
      title: 'Planification Stratégique',
      description: 'Conception et organisation minutieuse de chaque détail de votre événement',
    },
    {
      icon: '💡',
      title: 'Créativité & Innovation',
      description: 'Des concepts uniques et originaux adaptés à vos besoins',
    },
    {
      icon: '🤝',
      title: 'Coordination Parfaite',
      description: 'Gestion fluide de tous les prestataires et intervenants',
    },
    {
      icon: '✨',
      title: 'Excellence Garantie',
      description: 'Un service premium du début jusqu\'à la fin de votre événement',
    },
  ];

  const eventTypes = [
    {
      title: 'Mariages',
      description: 'De l\'intime au grandiose, créons le mariage de vos rêves',
      image: '/images/services/mariage.jpg',
    },
    {
      title: 'Anniversaires',
      description: 'Des célébrations mémorables pour tous les âges',
      image: '/images/services/anniversaire.jpg',
    },
    {
      title: 'Baptêmes',
      description: 'Un moment sacré célébré avec élégance',
      image: '/images/services/bapteme.jpg',
    },
    {
      title: 'Fêtes Privées',
      description: 'Des soirées inoubliables sur mesure',
      image: '/images/services/fete-privee.jpg',
    },
    {
      title: 'Événements d\'Entreprise',
      description: 'Séminaires, lancements et team building',
      image: '/images/services/entreprise.jpg',
    },
    {
      title: 'Cérémonies',
      description: 'Moments sacrés et traditionnels',
      image: '/images/services/ceremonie.jpg',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Rencontre pour comprendre votre vision et vos attentes',
    },
    {
      step: '02',
      title: 'Conception',
      description: 'Élaboration du concept et proposition détaillée',
    },
    {
      step: '03',
      title: 'Organisation',
      description: 'Coordination de tous les aspects logistiques',
    },
    {
      step: '04',
      title: 'Réalisation',
      description: 'Exécution parfaite le jour J',
    },
  ];

  // Animation pour la section Notre Approche
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setActiveFeature('split');
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Carousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(eventTypes.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [eventTypes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(eventTypes.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(eventTypes.length / 3)) % Math.ceil(eventTypes.length / 3));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div 
          className={styles.heroBackground}
          style={{
            backgroundImage: 'url(/images/services/evenementiel-hero.jpg)',
          }}
        />
        <div className={styles.heroOverlay} />
        
        <div className={`container-custom ${styles.heroContent}`}>
          <div className="max-w-3xl">
            <div className={styles.categoryBadge}>
              <span className={styles.categoryText}>🎊 Événementiel</span>
            </div>
            <h1 className={styles.heroTitle}>
              Organisation d'Événements d'Exception
            </h1>
            <p className={styles.heroDescription}>
              Transformez vos moments importants en souvenirs inoubliables. 
              Notre expertise et notre créativité au service de vos événements privés.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir nos réalisations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Split Animation */}
      <section ref={featuresRef} className={styles.featuresSection}>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Approche</h2>
            <p className={styles.sectionSubtitle}>
              Une méthodologie éprouvée pour garantir le succès de votre événement
            </p>
          </div>

          <div className={styles.featuresContainer}>
            {/* Élément central */}
            <div className={`${styles.featuresCenter} ${activeFeature === 'center' ? styles.active : styles.inactive}`}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>✨</div>
                <h3 className={styles.featureTitle}>Notre Expertise</h3>
                <p className={styles.featureDescription}>
                  Découvrez notre approche unique pour créer des événements exceptionnels
                </p>
              </div>
            </div>

            {/* Éléments gauche */}
            <div className={`${styles.featuresLeft} ${activeFeature === 'split' ? styles.active : ''}`}>
              {features.slice(0, 2).map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Éléments droite */}
            <div className={`${styles.featuresRight} ${activeFeature === 'split' ? styles.active : ''}`}>
              {features.slice(2, 4).map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section - Carousel */}
      <section className={styles.eventTypesSection}>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Types d'Événements</h2>
            <p className={styles.sectionSubtitle}>
              Nous organisons tous types d'événements avec le même niveau d'excellence
            </p>
          </div>

          <div className={styles.carouselContainer}>
            <div 
              ref={carouselRef}
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentSlide * (100 / 3)}%)`
              }}
            >
              {eventTypes.map((event, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <div className={styles.eventCard}>
                    <div 
                      className={styles.eventImage}
                      style={{
                        backgroundImage: `url(${event.image})`,
                      }}
                    />
                    <div className={styles.eventOverlay} />
                    <div className={styles.eventContent}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <p className={styles.eventDescription}>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Carousel */}
          <div className={styles.carouselNav}>
            <button 
              className={styles.carouselButton}
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            
            <div className={styles.carouselDots}>
              {Array.from({ length: Math.ceil(eventTypes.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselDot} ${currentSlide === index ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            <button 
              className={styles.carouselButton}
              onClick={nextSlide}
              disabled={currentSlide === Math.ceil(eventTypes.length / 3) - 1}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Le reste des sections reste identique */}
      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Processus</h2>
            <p className={styles.sectionSubtitle}>
              4 étapes pour un événement parfaitement orchestré
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item, index) => (
              <div key={index} className={styles.processItem}>
                <div className={styles.processCard}>
                  <div className={styles.stepNumber}>{item.step}</div>
                  <h3 className={styles.processTitle}>{item.title}</h3>
                  <p className={styles.processDescription}>{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className={styles.processConnector} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className={styles.servicesSection}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Services Inclus</h2>
              <p className={styles.sectionSubtitle}>
                Une prise en charge complète de A à Z
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {[
                'Sélection et réservation du lieu',
                'Décoration personnalisée',
                'Coordination des prestataires',
                'Animation et divertissement',
                'Service traiteur et restauration',
                'Photographie et vidéographie',
                'Sonorisation et éclairage',
                'Gestion des invitations',
                'Timeline et planification',
                'Coordination le jour J',
                'Service de sécurité',
                'Suivi post-événement',
              ].map((service, index) => (
                <div
                  key={index}
                  className={styles.serviceItem}
                >
                  <div className={styles.serviceIcon}>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className={styles.serviceText}>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container-custom">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Prêt à Créer Votre Événement de Rêve ?
            </h2>
            <p className={styles.ctaDescription}>
              Contactez-nous dès aujourd'hui pour discuter de votre projet. 
              Nous vous offrons un devis personnalisé gratuit.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis gratuit
                </Button>
              </Link>
              <Link href="tel:+225XXXXXXXXX">
                <Button variant="outline" size="lg">
                  Appelez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}