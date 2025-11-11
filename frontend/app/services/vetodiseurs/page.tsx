import Link from 'next/link';
import { Metadata } from 'next';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Vetodiseurs - Glory Event | Services Événementiels Spécialisés',
  description: 'Services événementiels spécialisés et personnalisés pour vos occasions uniques. Créativité, professionnalisme et excellence garantis.',
};

export default function VetodiseursPage() {
  const specialServices = [
    {
      icon: '🎨',
      title: 'Événements Thématiques',
      description: 'Créations d\'ambiances uniques et immersives selon vos thèmes préférés',
      features: ['Décoration sur-mesure', 'Costumes et animations', 'Scénographie complète'],
    },
    {
      icon: '🎪',
      title: 'Spectacles & Performances',
      description: 'Organisation de spectacles artistiques et performances live',
      features: ['Artistes professionnels', 'Chorégraphies personnalisées', 'Effets spéciaux'],
    },
    {
      icon: '🎬',
      title: 'Événements Cinématographiques',
      description: 'Projections privées et soirées à thème cinéma',
      features: ['Salle privée', 'Système audiovisuel premium', 'Ambiance VIP'],
    },
    {
      icon: '🎮',
      title: 'Gaming Events',
      description: 'Tournois et événements gaming professionnels',
      features: ['Setup professionnel', 'Streaming live', 'Animation gaming'],
    },
  ];

  const concepts = [
    {
      title: 'Soirées à Thème',
      image: '/images/services/soiree-theme.jpg',
      description: 'Des soirées immersives transportant vos invités dans un autre univers',
    },
    {
      title: 'Événements Culturels',
      image: '/images/services/culturel.jpg',
      description: 'Célébration et mise en valeur de la richesse culturelle',
    },
    {
      title: 'Expériences Interactives',
      image: '/images/services/interactif.jpg',
      description: 'Des animations engageantes et mémorables pour tous',
    },
    {
      title: 'Soirées VIP',
      image: '/images/services/vip.jpg',
      description: 'Un service exclusif pour des moments d\'exception',
    },
  ];

  const process = [
    {
      title: 'Brainstorming Créatif',
      description: 'Exploration de vos idées et développement de concepts innovants',
      icon: '💡',
    },
    {
      title: 'Design & Conception',
      description: 'Création des éléments visuels et scénographiques',
      icon: '🎨',
    },
    {
      title: 'Production',
      description: 'Fabrication et mise en place des éléments personnalisés',
      icon: '🛠️',
    },
    {
      title: 'Exécution Parfaite',
      description: 'Coordination et animation le jour J',
      icon: '✨',
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
              backgroundImage: 'url(/images/services/vetodiseurs-hero.jpg)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <span className="text-secondary font-semibold">🎭 Vetodiseurs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Événements Créatifs & Uniques
            </h1>
            <p className="text-xl md:text-2xl text-accent leading-relaxed mb-8">
              Transformez vos idées les plus audacieuses en réalité. 
              Des concepts innovants et des expériences inoubliables pour vos événements spéciaux.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Discuter de mon projet
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

      {/* Special Services Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Services Spécialisés</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des prestations sur-mesure pour des événements extraordinaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialServices.map((service, index) => (
              <div
                key={index}
                className="bg-dark border border-secondary/20 rounded-2xl p-8 
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-accent leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-accent">
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
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Concepts Signature</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des expériences mémorables conçues avec créativité et passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {concepts.map((concept, index) => (
              <div
                key={index}
                className="group relative h-96 rounded-2xl overflow-hidden card-hover"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transform 
                            group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${concept.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-secondary mb-3 group-hover:text-accent 
                                transition-colors">
                    {concept.title}
                  </h3>
                  <p className="text-accent text-lg leading-relaxed">
                    {concept.description}
                  </p>
                </div>
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
              De l'idée à la réalisation, un accompagnement complet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-dark border border-secondary/20 rounded-xl p-8 
                              hover:border-secondary/50 transition-all duration-500 
                              h-full flex flex-col">
                  <div className="text-7xl mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-accent leading-relaxed flex-1">
                    {step.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-block w-12 h-12 rounded-full bg-secondary/20 
                                   text-secondary font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Pourquoi Choisir Nos Services ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Créativité Sans Limites',
                  description: 'Des concepts innovants adaptés à vos envies les plus folles',
                },
                {
                  title: 'Équipe Multidisciplinaire',
                  description: 'Designers, artistes, techniciens experts dans leurs domaines',
                },
                {
                  title: 'Matériel Professionnel',
                  description: 'Équipements dernière génération pour un résultat impeccable',
                },
                {
                  title: 'Flexibilité Totale',
                  description: 'Adaptation à vos besoins et à votre budget',
                },
                {
                  title: 'Attention aux Détails',
                  description: 'Chaque élément est soigneusement pensé et réalisé',
                },
                {
                  title: 'Support Complet',
                  description: 'Accompagnement de la conception à la réalisation',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-primary border border-secondary/20 
                            rounded-xl hover:border-secondary/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 
                                flex items-center justify-center">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                    <p className="text-accent">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 
                         rounded-3xl p-12 text-center border border-secondary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Créons Ensemble Votre Événement Unique
            </h2>
            <p className="text-xl text-accent mb-10 max-w-2xl mx-auto">
              Partagez-nous votre vision, nous la transformerons en une expérience inoubliable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Démarrer mon projet
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