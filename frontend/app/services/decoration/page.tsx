import Link from 'next/link';
import { Metadata } from 'next';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Décoration - Glory Event | Design d\'Intérieur Événementiel Premium',
  description: 'Services de décoration événementielle haut de gamme. Créations uniques et personnalisées pour mariages, événements corporate et célébrations. Élégance et raffinement.',
};

export default function DecorationPage() {
  const decorationStyles = [
    {
      title: 'Élégance Classique',
      icon: '👑',
      description: 'Sophistication intemporelle avec des matériaux nobles',
      features: [
        'Nappes et chemins de table premium',
        'Vaisselle porcelaine fine',
        'Argenterie raffinée',
        'Cristallerie d\'exception',
      ],
      image: '/images/services/deco-classique.jpg',
      color: 'from-secondary/20',
    },
    {
      title: 'Moderne & Minimaliste',
      icon: '✨',
      description: 'Design épuré et contemporain pour un impact maximal',
      features: [
        'Lignes épurées',
        'Couleurs neutres sophistiquées',
        'Éclairage d\'ambiance LED',
        'Mobilier design',
      ],
      image: '/images/services/deco-moderne.jpg',
      color: 'from-accent/20',
    },
    {
      title: 'Romantique & Floral',
      icon: '🌸',
      description: 'Compositions florales somptueuses et ambiances féeriques',
      features: [
        'Arches florales majestueuses',
        'Centres de table luxuriants',
        'Guirlandes naturelles',
        'Parfums subtils',
      ],
      image: '/images/services/deco-romantique.jpg',
      color: 'from-pink-500/20',
    },
    {
      title: 'Africain Contemporain',
      icon: '🌍',
      description: 'Fusion entre traditions africaines et modernité',
      features: [
        'Tissus wax premium',
        'Sculptures artisanales',
        'Motifs ethniques chic',
        'Couleurs vibrantes',
      ],
      image: '/images/services/deco-africaine.jpg',
      color: 'from-orange-500/20',
    },
    {
      title: 'Luxe & Glamour',
      icon: '💎',
      description: 'Opulence et magnificence pour événements d\'exception',
      features: [
        'Or et paillettes',
        'Cristaux Swarovski',
        'Velours et soie',
        'Candélabres majestueux',
      ],
      image: '/images/services/deco-luxe.jpg',
      color: 'from-yellow-500/20',
    },
    {
      title: 'Champêtre & Bohème',
      icon: '🌾',
      description: 'Naturel et authentique avec une touche de poésie',
      features: [
        'Bois brut et dentelle',
        'Fleurs sauvages',
        'Éclairage guirlande',
        'Ambiance cosy',
      ],
      image: '/images/services/deco-champetre.jpg',
      color: 'from-green-500/20',
    },
  ];

  const services = [
    {
      icon: '🎨',
      title: 'Conception Sur-Mesure',
      description: 'Design personnalisé selon vos goûts, thème et budget',
    },
    {
      icon: '💐',
      title: 'Art Floral',
      description: 'Compositions florales élaborées par nos artistes floraux',
    },
    {
      icon: '💡',
      title: 'Éclairage d\'Ambiance',
      description: 'Jeux de lumière pour sublimer votre décoration',
    },
    {
      icon: '🪑',
      title: 'Mobilier Premium',
      description: 'Location de mobilier design et confortable',
    },
    {
      icon: '🎭',
      title: 'Accessoires Déco',
      description: 'Large gamme d\'accessoires pour personnaliser votre espace',
    },
    {
      icon: '🖼️',
      title: 'Scénographie',
      description: 'Création d\'espaces thématiques immersifs',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Rencontre pour comprendre votre vision et vos inspirations',
      icon: '💬',
    },
    {
      step: '02',
      title: 'Concept Design',
      description: 'Création de planches d\'ambiance et moodboards',
      icon: '🎨',
    },
    {
      step: '03',
      title: 'Sélection',
      description: 'Choix des matériaux, couleurs et éléments décoratifs',
      icon: '✨',
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Mise en place professionnelle le jour J',
      icon: '🛠️',
    },
  ];

  const packages = [
    {
      name: 'Déco Essentielle',
      price: 'À partir de 500 000 FCFA',
      features: [
        'Consultation initiale',
        'Plan de décoration basique',
        'Centres de table simples',
        'Nappage et housses de chaises',
        'Installation et retrait',
      ],
      popular: false,
    },
    {
      name: 'Déco Premium',
      price: 'À partir de 1 500 000 FCFA',
      features: [
        'Tout Essentiel +',
        'Design personnalisé complet',
        'Art floral premium',
        'Éclairage d\'ambiance',
        'Mobilier design',
        'Accessoires exclusifs',
        'Coordinateur dédié',
      ],
      popular: true,
    },
    {
      name: 'Déco Prestige',
      price: 'Sur devis personnalisé',
      features: [
        'Tout Premium +',
        'Conception sur-mesure unique',
        'Fleurs d\'importation',
        'Scénographie complète',
        'Éléments sur-mesure',
        'Installation VIP',
        'Service 24/7',
      ],
      popular: false,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dark via-primary to-dark overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/services/decoration-hero.jpg)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <span className="text-secondary font-semibold">🎨 Décoration</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Transformons Vos Espaces en Œuvres d'Art
            </h1>
            <p className="text-xl md:text-2xl text-accent leading-relaxed mb-8">
              De l'élégance classique au design contemporain, nous créons des décors 
              exceptionnels qui subliment vos événements et marquent les esprits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis déco
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir nos créations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decoration Styles Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Styles de Décoration</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une palette variée pour correspondre à tous les goûts et toutes les ambiances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decorationStyles.map((style, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-dark border border-secondary/20 
                           hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                {/* Image Background */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 
                               transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${style.image})`,
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${style.color} to-transparent`} />
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-dark/80 backdrop-blur-sm 
                                flex items-center justify-center text-4xl">
                    {style.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-accent 
                                transition-colors">
                    {style.title}
                  </h3>
                  <p className="text-accent leading-relaxed mb-4">{style.description}</p>
                  
                  <ul className="space-y-2">
                    {style.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-accent text-sm">
                        <svg
                          className="w-4 h-4 text-secondary flex-shrink-0"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
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
            <h2 className="section-title">Nos Services de Décoration</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une gamme complète pour sublimer chaque détail de votre événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-primary border border-secondary/20 rounded-xl p-8 text-center
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

      {/* Process Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Processus Créatif</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              De l'idée à la réalisation, un accompagnement sur-mesure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-dark border border-secondary/20 rounded-xl p-8 
                              hover:border-secondary/50 transition-all duration-500 h-full flex flex-col">
                  <div className="text-6xl mb-6 text-center">{item.icon}</div>
                  <div className="w-14 h-14 rounded-full bg-secondary text-primary font-bold text-xl 
                                flex items-center justify-center mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-accent text-center leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Formules Décoration</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des forfaits adaptés à tous les budgets et toutes les envies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-primary border-2 rounded-2xl p-8 transition-all duration-500 
                           ${pkg.popular 
                             ? 'border-secondary shadow-2xl shadow-secondary/20 scale-105' 
                             : 'border-secondary/20 hover:border-secondary/50'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-primary px-6 py-2 rounded-full 
                                   font-bold text-sm shadow-lg">
                      ⭐ POPULAIRE
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-secondary mb-4">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-accent">{pkg.price}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5"
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
                      <span className="text-accent">{feature}</span>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi Choisir Notre Service Déco ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Équipe Créative',
                description: 'Designers et décorateurs passionnés et expérimentés',
              },
              {
                icon: '💎',
                title: 'Matériaux Premium',
                description: 'Sélection rigoureuse des meilleurs fournisseurs',
              },
              {
                icon: '✨',
                title: 'Sur-Mesure',
                description: 'Chaque décoration est unique et personnalisée',
              },
              {
                icon: '⚡',
                title: 'Installation Pro',
                description: 'Mise en place soignée et dans les délais',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-dark border border-secondary/20 rounded-xl p-8
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-accent leading-relaxed">{item.description}</p>
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
              Créons Ensemble Votre Décor de Rêve
            </h2>
            <p className="text-xl text-accent mb-10 max-w-2xl mx-auto">
              Partagez-nous votre vision et laissez notre équipe créative 
              transformer votre espace en un lieu magique et inoubliable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis décoration
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir notre portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}