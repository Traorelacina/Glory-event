import Link from 'next/link';
import { Metadata } from 'next';
import Button from '../../components/ui/Button';

export const metadata: Metadata = {
  title: 'Historique - Glory Event | Notre Parcours et Réalisations',
  description: 'Découvrez l\'histoire de Glory Event, notre évolution et nos réalisations marquantes. Plus de 10 ans d\'excellence dans l\'événementiel.',
};

export default function HistoriquePage() {
  const milestones = [
    {
      year: '2014',
      title: 'Naissance de Glory Event',
      description: 'Création de l\'entreprise avec pour mission d\'offrir des services événementiels d\'exception',
      icon: '🌱',
    },
    {
      year: '2016',
      title: 'Première Grande Expansion',
      description: 'Ouverture de notre second bureau et expansion de l\'équipe',
      icon: '📈',
    },
    {
      year: '2018',
      title: 'Prix d\'Excellence',
      description: 'Reconnaissance nationale pour nos services premium et notre innovation',
      icon: '🏆',
    },
    {
      year: '2020',
      title: '500+ Événements',
      description: 'Franchissement du cap des 500 événements organisés avec succès',
      icon: '🎊',
    },
    {
      year: '2022',
      title: 'Diversification',
      description: 'Lancement de notre boutique de parfums de luxe et expansion des services',
      icon: '💎',
    },
    {
      year: '2024',
      title: 'Leader du Marché',
      description: 'Positionnement comme référence dans l\'événementiel premium en Côte d\'Ivoire',
      icon: '👑',
    },
  ];

  const achievements = [
    {
      number: '1000+',
      label: 'Événements Réussis',
      icon: '🎉',
    },
    {
      number: '5000+',
      label: 'Clients Satisfaits',
      icon: '😊',
    },
    {
      number: '50+',
      label: 'Professionnels',
      icon: '👥',
    },
    {
      number: '15+',
      label: 'Prix & Distinctions',
      icon: '🏅',
    },
  ];

  const values = [
    {
      icon: '⭐',
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque détail de nos prestations',
    },
    {
      icon: '🤝',
      title: 'Intégrité',
      description: 'Transparence, honnêteté et respect dans toutes nos relations',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Créativité constante pour offrir des expériences uniques',
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Un amour sincère pour notre métier et le bonheur de nos clients',
    },
  ];

  const team = [
    {
      name: 'Direction Générale',
      description: 'Vision stratégique et leadership',
      icon: '👨‍💼',
    },
    {
      name: 'Équipe Créative',
      description: 'Designers et concepteurs talentueux',
      icon: '🎨',
    },
    {
      name: 'Coordination',
      description: 'Professionnels de la logistique événementielle',
      icon: '📋',
    },
    {
      name: 'Service Client',
      description: 'Accompagnement personnalisé et réactif',
      icon: '💬',
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
              backgroundImage: 'url(/images/services/historique-hero.jpg)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <span className="text-secondary font-semibold">📖 Notre Histoire</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Une Décennie d'Excellence Événementielle
            </h1>
            <p className="text-xl md:text-2xl text-accent leading-relaxed mb-8">
              Depuis 2014, Glory Event transforme les rêves en réalité. 
              Découvrez notre parcours, nos valeurs et notre engagement envers l'excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Rejoignez notre aventure
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Nos réalisations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Parcours</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Les moments clés qui ont façonné Glory Event
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary/30 
                          transform -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-dark border border-secondary/20 rounded-xl p-8 
                                   hover:border-secondary/50 transition-all duration-500 card-hover
                                   ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="text-5xl mb-4">{milestone.icon}</div>
                      <span className="inline-block px-4 py-1 bg-secondary/20 rounded-full 
                                     text-secondary font-bold text-sm mb-4">
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl font-bold text-secondary mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-accent leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 w-16 h-16 rounded-full bg-secondary flex items-center 
                                justify-center text-primary font-bold text-xl shadow-lg ring-4 ring-primary">
                    {index + 1}
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">En Chiffres</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des résultats qui témoignent de notre engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center bg-primary border border-secondary/20 rounded-xl p-8 
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{achievement.icon}</div>
                <div className="text-5xl font-bold text-secondary mb-2">
                  {achievement.number}
                </div>
                <p className="text-accent text-lg font-semibold">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Valeurs</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-dark border border-secondary/20 rounded-xl p-8 text-center
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-7xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                <p className="text-accent leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Équipe</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Des professionnels passionnés et dévoués à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-primary border border-secondary/20 rounded-xl p-8 text-center
                          hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{member.name}</h3>
                <p className="text-accent">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">Notre Vision pour l'Avenir</h2>
            <p className="text-xl text-accent leading-relaxed mb-8">
              Nous aspirons à devenir la référence incontournable de l'événementiel premium 
              en Afrique de l'Ouest, tout en continuant à innover et à dépasser les attentes 
              de nos clients. Notre engagement : transformer chaque événement en une expérience 
              mémorable et exceptionnelle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: '🌍',
                  title: 'Expansion Régionale',
                  description: 'Étendre nos services dans toute l\'Afrique de l\'Ouest',
                },
                {
                  icon: '🚀',
                  title: 'Innovation Continue',
                  description: 'Intégrer les dernières technologies événementielles',
                },
                {
                  icon: '🌟',
                  title: 'Excellence Durable',
                  description: 'Maintenir nos standards élevés de qualité et service',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-dark border border-secondary/20 rounded-xl p-6
                            hover:border-secondary/50 transition-all duration-500"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-accent text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 
                         rounded-3xl p-12 text-center border border-secondary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Faites Partie de Notre Histoire
            </h2>
            <p className="text-xl text-accent mb-10 max-w-2xl mx-auto">
              Rejoignez les milliers de clients qui ont fait confiance à Glory Event 
              pour leurs moments les plus précieux.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Contactez-nous
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}