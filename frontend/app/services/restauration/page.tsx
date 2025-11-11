import Link from 'next/link';
import { Metadata } from 'next';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Restauration - Glory Event | Gastronomie Africaine, Européenne & Américaine',
  description: 'Services de restauration premium pour vos événements. Cuisine africaine authentique, européenne raffinée et américaine gourmande. Traiteur professionnel.',
};

export default function RestaurationPage() {
  const cuisines = [
    {
      type: 'Cuisine Africaine',
      icon: '🌍',
      description: 'L\'authenticité et les saveurs traditionnelles d\'Afrique',
      image: '/images/services/cuisine-africaine.jpg',
      specialties: [
        'Attiéké Poisson Braisé',
        'Alloco Plantain',
        'Kedjenou de Poulet',
        'Riz Sauce Graine',
        'Poulet DG',
        'Fufu et Sauce Graine',
        'Mafé Traditionnel',
        'Thiéboudienne',
      ],
      features: [
        'Ingrédients frais et locaux',
        'Recettes authentiques',
        'Présentation élégante',
        'Options végétariennes',
      ],
    },
    {
      type: 'Cuisine Européenne',
      icon: '🇪🇺',
      description: 'L\'élégance et le raffinement de la gastronomie européenne',
      image: '/images/services/cuisine-europeenne.jpg',
      specialties: [
        'Bœuf Wellington',
        'Risotto aux Champignons',
        'Saumon à l\'Oseille',
        'Coq au Vin',
        'Ratatouille Niçoise',
        'Osso Buco',
        'Paella Royale',
        'Bouillabaisse',
      ],
      features: [
        'Techniques culinaires françaises',
        'Produits importés premium',
        'Présentation gastronomique',
        'Service à la française',
      ],
    },
    {
      type: 'Cuisine Américaine',
      icon: '🇺🇸',
      description: 'Le dynamisme et la générosité de la cuisine américaine',
      image: '/images/services/cuisine-americaine.jpg',
      specialties: [
        'BBQ Ribs Caramélisées',
        'Burgers Gourmet',
        'Mac & Cheese Premium',
        'Buffalo Wings',
        'Pulled Pork Sandwich',
        'Steaks Grillés',
        'Cheesecake New York',
        'Brownies Maison',
      ],
      features: [
        'Grillades professionnelles',
        'Portions généreuses',
        'Street food revisitée',
        'Ambiance conviviale',
      ],
    },
  ];

  const services = [
    {
      icon: '🍽️',
      title: 'Menu Personnalisé',
      description: 'Création de menus sur-mesure selon vos préférences et contraintes',
    },
    {
      icon: '👨‍🍳',
      title: 'Chefs Professionnels',
      description: 'Équipe de chefs expérimentés et passionnés',
    },
    {
      icon: '🥂',
      title: 'Service Traiteur',
      description: 'Service complet incluant vaisselle, personnel et décoration de table',
    },
    {
      icon: '🌱',
      title: 'Options Alimentaires',
      description: 'Menus végétariens, vegan, sans gluten, halal disponibles',
    },
    {
      icon: '🍷',
      title: 'Boissons & Cocktails',
      description: 'Large sélection de boissons et cocktails signature',
    },
    {
      icon: '🎂',
      title: 'Pâtisserie',
      description: 'Desserts et gâteaux personnalisés pour vos événements',
    },
  ];

  const menuFormats = [
    {
      title: 'Cocktail Dînatoire',
      description: 'Assortiment de bouchées et canapés raffinés',
      ideal: 'Réceptions, networking, vernissages',
      portions: '12-15 pièces/personne',
    },
    {
      title: 'Buffet',
      description: 'Variété de plats chauds et froids en libre-service',
      ideal: 'Mariages, anniversaires, événements d\'entreprise',
      portions: '4-6 plats + desserts',
    },
    {
      title: 'Menu Assis',
      description: 'Service à table avec menu en plusieurs services',
      ideal: 'Galas, dîners officiels, cérémonies',
      portions: 'Entrée + Plat + Dessert',
    },
    {
      title: 'BBQ & Grillades',
      description: 'Viandes grillées et accompagnements généreux',
      ideal: 'Événements outdoor, team building, fêtes',
      portions: 'À volonté',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Échange sur vos préférences, budget et contraintes',
    },
    {
      step: '02',
      title: 'Proposition',
      description: 'Création de menus personnalisés et devis détaillé',
    },
    {
      step: '03',
      title: 'Dégustation',
      description: 'Session de dégustation pour validation des plats',
    },
    {
      step: '04',
      title: 'Préparation',
      description: 'Préparation soignée avec ingrédients frais',
    },
    {
      step: '05',
      title: 'Service',
      description: 'Livraison et service professionnel le jour J',
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
              backgroundImage: 'url(/images/services/restauration-hero.jpg)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <span className="text-secondary font-semibold">🍽️ Restauration</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Gastronomie d'Exception pour Vos Événements
            </h1>
            <p className="text-xl md:text-2xl text-accent leading-relaxed mb-8">
              Savourez une expérience culinaire unique avec nos trois cuisines : 
              Africaine authentique, Européenne raffinée et Américaine généreuse. 
              Des saveurs qui marquent les esprits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un menu
                </Button>
              </Link>
              <Link href="#cuisines">
                <Button variant="outline" size="lg">
                  Découvrir nos cuisines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section id="cuisines" className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Trois Cuisines</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une palette de saveurs pour satisfaire tous les palais
            </p>
          </div>

          <div className="space-y-16">
            {cuisines.map((cuisine, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative h-96 rounded-2xl overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform 
                                group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${cuisine.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="text-7xl">{cuisine.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="bg-dark border border-secondary/20 rounded-2xl p-8">
                    <h3 className="text-3xl font-bold text-secondary mb-4">
                      {cuisine.type}
                    </h3>
                    <p className="text-accent text-lg leading-relaxed mb-6">
                      {cuisine.description}
                    </p>

                    {/* Specialties */}
                    <h4 className="text-xl font-bold text-secondary mb-4">
                      Nos Spécialités
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {cuisine.specialties.map((specialty, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-accent text-sm"
                        >
                          <svg
                            className="w-5 h-5 text-secondary flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {specialty}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="border-t border-secondary/20 pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        {cuisine.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-secondary flex-shrink-0"
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
                            <span className="text-accent text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une prestation complète pour une expérience gastronomique réussie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-primary border border-secondary/20 rounded-xl p-8 
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{service.title}</h3>
                <p className="text-accent leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Formats Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Formats de Menu</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Adaptez le service à votre type d'événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuFormats.map((format, index) => (
              <div
                key={index}
                className="bg-dark border border-secondary/20 rounded-xl p-8
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <h3 className="text-2xl font-bold text-secondary mb-3">{format.title}</h3>
                <p className="text-accent leading-relaxed mb-4">{format.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-semibold">Idéal pour:</span>
                    <span className="text-accent">{format.ideal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-semibold">Portions:</span>
                    <span className="text-accent">{format.portions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Processus</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              De la commande à la dégustation, excellence à chaque étape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary border border-secondary/20 rounded-xl p-6
                              hover:border-secondary/50 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-full bg-secondary text-primary font-bold text-xl 
                                flex items-center justify-center mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-accent text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 
                         rounded-3xl p-12 text-center border border-secondary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Régalez Vos Invités avec Notre Gastronomie
            </h2>
            <p className="text-xl text-accent mb-10 max-w-2xl mx-auto">
              Contactez-nous pour créer le menu parfait qui enchantera vos convives 
              et fera de votre événement un moment culinaire inoubliable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis
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