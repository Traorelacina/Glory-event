'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function EvenementielMariagePage() {
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const packages = [
    {
      name: 'Essentiel',
      price: 'Sur devis',
      features: [
        'Consultation et planification',
        'Sélection du lieu',
        'Coordination des prestataires',
        'Décoration de base',
        'Coordination le jour J',
        'Timeline détaillée',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: 'Sur devis',
      features: [
        'Tous les services Essentiel',
        'Décoration personnalisée',
        'Design floral premium',
        'Coordination répétition',
        'Gestion des invitations',
        'Photographie professionnelle',
        'Menu gastronomique personnalisé',
      ],
      popular: true,
    },
    {
      name: 'Prestige',
      price: 'Sur devis',
      features: [
        'Tous les services Premium',
        'Wedding planner dédié 24/7',
        'Décoration haut de gamme',
        'Animation exclusive',
        'Vidéographie cinématique',
        'Voyage de noces inclus',
        'Suivi post-mariage',
        'Services VIP invités',
      ],
      popular: false,
    },
  ];

  const services = [
    {
      icon: '💐',
      title: 'Décoration Florale',
      description: 'Arrangements floraux somptueux et personnalisés selon votre thème',
    },
    {
      icon: '🎭',
      title: 'Animation & DJ',
      description: 'Musique et animations pour faire vibrer votre soirée',
    },
    {
      icon: '📸',
      title: 'Photo & Vidéo',
      description: 'Capturer les moments précieux avec professionnalisme',
    },
    {
      icon: '🍰',
      title: 'Pâtisserie',
      description: 'Gâteaux de mariage spectaculaires et délicieux',
    },
    {
      icon: '🍽️',
      title: 'Traiteur Gourmet',
      description: 'Menu gastronomique adapté à vos préférences',
    },
    {
      icon: '💌',
      title: 'Papeterie',
      description: 'Invitations et faire-part élégants sur mesure',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah & Mohamed',
      date: 'Juin 2024',
      text: 'Glory Event a transformé notre rêve en réalité. Chaque détail était parfait, du début à la fin. Merci infiniment !',
      rating: 5,
    },
    {
      name: 'Aya & Kofi',
      date: 'Septembre 2024',
      text: 'Une organisation impeccable ! L\'équipe est professionnelle, à l\'écoute et très créative. Notre mariage était magique.',
      rating: 5,
    },
    {
      name: 'Fatou & Jean',
      date: 'Décembre 2024',
      text: 'Le meilleur investissement de notre mariage. Glory Event a géré tout avec excellence. Nous recommandons vivement !',
      rating: 5,
    },
  ];

  // Animation au scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const sectionIds = ['why', 'packages', 'services', 'testimonials', 'cta'];
    
    sectionIds.forEach((sectionId) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animatedSections.includes(sectionId)) {
              setAnimatedSections(prev => [...prev, sectionId]);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (sectionRefs.current[sectionId]) {
        observer.observe(sectionRefs.current[sectionId]!);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [animatedSections]);

  const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[sectionId] = el;
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div 
          className={styles.heroBackground}
          style={{
            backgroundImage: 'url(/images/services/mariage-hero.jpg)',
          }}
        />
        <div className={styles.heroOverlay} />
        
        {/* Floating Hearts */}
        <div className={styles.floatingHearts}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.heart}>💖</div>
          ))}
        </div>
        
        <div className={`container-custom ${styles.heroContent}`}>
          <div className="max-w-3xl">
            <div className={styles.categoryBadge}>
              <span className={styles.categoryText}>💒 Organisation de Mariage</span>
            </div>
            <h1 className={styles.heroTitle}>
              Le Jour le Plus Important de Votre Vie
            </h1>
            <p className={styles.heroDescription}>
              Dites "Oui" à un mariage de rêve. Nous orchestrons chaque moment 
              pour que votre union soit aussi unique que votre histoire d'amour.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Planifier mon mariage
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Mariages réalisés
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        ref={setSectionRef('why')}
        className={`${styles.whySection} ${animatedSections.includes('why') ? styles.stagger : ''}`}
      >
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pourquoi Choisir Glory Event ?</h2>
            <p className={styles.sectionSubtitle}>
              Une expertise reconnue dans l'organisation de mariages d'exception
            </p>
          </div>

          <div className={styles.statsGrid}>
            {[
              {
                icon: '🌟',
                title: 'Plus de 200 Mariages',
                description: 'Une expérience riche et variée au service de votre bonheur',
              },
              {
                icon: '💝',
                title: 'Approche Personnalisée',
                description: 'Chaque mariage est unique, votre célébration le sera aussi',
              },
              {
                icon: '✨',
                title: 'Satisfaction 100%',
                description: 'Des couples heureux qui recommandent nos services',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={styles.statCard}
              >
                <div className={styles.statIcon}>{item.icon}</div>
                <h3 className={styles.statTitle}>{item.title}</h3>
                <p className={styles.statDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section 
        ref={setSectionRef('packages')}
        className={`${styles.packagesSection} ${animatedSections.includes('packages') ? styles.stagger : ''}`}
      >
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Formules Mariage</h2>
            <p className={styles.sectionSubtitle}>
              Choisissez la formule qui correspond à vos attentes et votre budget
            </p>
          </div>

          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={styles.packageCard}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>
                    ⭐ POPULAIRE
                  </div>
                )}
                
                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <p className={styles.packagePrice}>{pkg.price}</p>
                </div>

                <ul className={styles.featuresList}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <svg
                        className={styles.featureIcon}
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
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                  >
                    Choisir cette formule
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={setSectionRef('services')}
        className={`${styles.servicesSection} ${animatedSections.includes('services') ? styles.stagger : ''}`}
      >
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Services Inclus</h2>
            <p className={styles.sectionSubtitle}>
              Une prise en charge complète pour votre journée parfaite
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={setSectionRef('testimonials')}
        className={`${styles.testimonialsSection} ${animatedSections.includes('testimonials') ? styles.stagger : ''}`}
      >
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Témoignages de Nos Mariés</h2>
            <p className={styles.sectionSubtitle}>
              Ce que nos couples disent de leur expérience avec Glory Event
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={styles.testimonialCard}
              >
                <div className={styles.ratingStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className={styles.star}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  "{testimonial.text}"
                </p>
                <div className={styles.testimonialAuthor}>
                  <p className={styles.authorName}>{testimonial.name}</p>
                  <p className={styles.authorDate}>{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={setSectionRef('cta')}
        className={styles.ctaSection}
      >
        <div className="container-custom">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Commencez à Planifier Votre Mariage de Rêve
            </h2>
            <p className={styles.ctaDescription}>
              Rencontrons-nous pour discuter de votre vision et créer ensemble 
              le mariage parfait que vous méritez.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un rendez-vous
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir nos mariages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}