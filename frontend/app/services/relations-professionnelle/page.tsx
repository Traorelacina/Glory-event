import Link from 'next/link';
import { Metadata } from 'next';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Relations Professionnelles - Glory Event | Événements Corporate',
  description: 'Organisation d\'événements professionnels et corporate : séminaires, conférences, team building, lancements de produits. Excellence et professionnalisme.',
};

export default function RelationsProfessionnellePage() {
  const corporateServices = [
    {
      icon: '🎯',
      title: 'Séminaires & Conférences',
      description: 'Organisation complète de vos événements professionnels',
      features: [
        'Sélection de lieux prestigieux',
        'Équipement audiovisuel de pointe',
        'Interprétation simultanée',
        'Supports de communication',
      ],
    },
    {
      icon: '🤝',
      title: 'Team Building',
      description: 'Activités de cohésion d\'équipe sur-mesure',
      features: [
        'Activités sportives et ludiques',
        'Challenges créatifs',
        'Programmes motivationnels',
        'Débriefing et analyse',
      ],
    },
    {
      icon: '🚀',
      title: 'Lancements de Produits',
      description: 'Événements marquants pour vos nouveautés',
      features: [
        'Concept créatif unique',
        'Relations presse',
        'Expérience immersive',
        'Couverture médiatique',
      ],
    },
    {
      icon: '🎊',
      title: 'Soirées d\'Entreprise',
      description: 'Célébrations corporate mémorables',
      features: [
        'Galas de fin d\'année',
        'Anniversaires d\'entreprise',
        'Récompenses et distinctions',
        'Networking premium',
      ],
    },
  ];

  const clients = [
    {
      sector: 'Banques & Finance',
      description: 'Séminaires stratégiques et événements de prestige',
      icon: '🏦',
    },
    {
      sector: 'Technologie',
      description: 'Lancements produits et conférences tech',
      icon: '💻',
    },
    {
      sector: 'Pharmaceutique',
      description: 'Congrès médicaux et formations',
      icon: '⚕️',
    },
    {
      sector: 'Télécommunications',
      description: 'Événements grand public et B2B',
      icon: '📱',
    },
    {
      sector: 'Automobile',
      description: 'Présentations et salons automobiles',
      icon: '🚗',
    },
    {
      sector: 'Immobilier',
      description: 'Inaugurations et visites VIP',
      icon: '🏢',
    },
  ];

  const advantages = [
    {
      title: 'Expertise Reconnue',
      description: 'Plus de 300 événements corporate organisés avec succès',
      icon: '🏆',
    },
    {
      title: 'Équipement Professionnel',
      description: 'Technologies de pointe pour des présentations impactantes',
      icon: '🎬',
    },
    {
      title: 'Réseau de Prestataires',
      description: 'Partenaires triés sur le volet pour garantir l\'excellence',
      icon: '🤝',
    },
    {
      title: 'Confidentialité Assurée',
      description: 'Respect total de vos informations sensibles',
      icon: '🔒',
    },
    {
      title: 'Flexibilité',
      description: 'Adaptation rapide aux changements de dernière minute',
      icon: '⚡',
    },
    {
      title: 'Support 24/7',
      description: 'Équipe disponible à tout moment pour vos besoins',
      icon: '📞',
    },
  ];

  const eventTypes = [
    {
      title: 'Conventions d\'Entreprise',
      image: '/images/services/convention.jpg',
      capacity: '50-1000 personnes',
    },
    {
      title: 'Formations & Workshops',
      image: '/images/services/formation.jpg',
      capacity: '10-100 personnes',
    },
    {
      title: 'Cocktails Networking',
      image: '/images/services/networking.jpg',
      capacity: '50-300 personnes',
    },
    {
      title: 'Assemblées Générales',
      image: '/images/services/assemblee.jpg',
      capacity: '100-500 personnes',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dark via-primary to-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/services/corporate-hero.jpg)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <span className="text-secondary font-semibold">🏢 Relations Professionnelles</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Événements Corporate d'Excellence
            </h1>
            <p className="text-xl md:text-2xl text-accent leading-relaxed mb-8">
              Renforcez votre image de marque et fédérez vos équipes avec des événements 
              professionnels parfaitement orchestrés. Excellence, innovation et impact garanti.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Nos événements corporate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Services Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Services Corporate</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins événementiels professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateServices.map((service, index) => (
              <div
                key={index}
                className="bg-dark border border-secondary/20 rounded-2xl p-8 
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
                <p className="text-accent leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 
                                    flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-secondary"
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
                      <span className="text-accent">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types Gallery */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Types d'Événements</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Nous organisons tous types d'événements professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((event, index) => (
              <div
                key={index}
                className="group relative h-80 rounded-2xl overflow-hidden card-hover"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transform 
                            group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${event.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-secondary mb-2">{event.title}</h3>
                  <p className="text-accent text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Secteurs d'Intervention</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une expertise transversale au service de multiples industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-dark border border-secondary/20 rounded-xl p-8 text-center
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{client.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{client.sector}</h3>
                <p className="text-accent">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Atouts</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Ce qui fait de nous le partenaire idéal pour vos événements corporate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-primary border border-secondary/20 rounded-xl p-8
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-5xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{advantage.title}</h3>
                <p className="text-accent leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Processus</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une méthodologie éprouvée pour la réussite de vos événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Brief', icon: '📋' },
              { step: '02', title: 'Proposition', icon: '💡' },
              { step: '03', title: 'Planification', icon: '📅' },
              { step: '04', title: 'Coordination', icon: '🎯' },
              { step: '05', title: 'Exécution', icon: '✨' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-dark border border-secondary/20 rounded-xl p-6 
                              hover:border-secondary/50 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-full bg-secondary text-primary font-bold text-xl 
                                flex items-center justify-center mb-4 mx-auto">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 
                         rounded-3xl p-12 text-center border border-secondary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Organisez Votre Prochain Événement Corporate
            </h2>
            <p className="text-xl text-accent mb-10 max-w-2xl mx-auto">
              Faites confiance à notre expertise pour créer un événement professionnel 
              qui marquera les esprits et atteindra vos objectifs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis personnalisé
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