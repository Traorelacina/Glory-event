import Link from 'next/link';
import { SERVICES } from '../lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services - Glory Event | Organisation d\'Événements Premium',
  description: 'Découvrez tous nos services : mariages, événements professionnels, décoration, restauration et plus encore. Excellence et professionnalisme garantis.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dark via-primary to-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/services/services-hero.jpg)',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Nos Services Premium
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Une expertise complète pour transformer vos événements en moments inoubliables. 
              De la conception à la réalisation, nous vous accompagnons à chaque étape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-dark rounded-2xl overflow-hidden border border-secondary/20 
                           hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${service.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-secondary/90 backdrop-blur-sm 
                                    flex items-center justify-center text-3xl transform group-hover:scale-110 
                                    group-hover:rotate-12 transition-transform duration-500">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <h3 className="text-3xl font-bold text-secondary mb-4 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                      {service.shortDescription}
                    </p>
                    
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-secondary font-semibold 
                                 group-hover:gap-4 transition-all duration-300"
                    >
                      <span>En savoir plus</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-tl-full 
                                transform group-hover:scale-150 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi Choisir Glory Event ?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Une approche professionnelle et personnalisée pour chaque événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Expertise Reconnue',
                description: 'Plus de 10 ans d\'expérience dans l\'organisation d\'événements premium',
              },
              {
                icon: '💎',
                title: 'Qualité Premium',
                description: 'Sélection rigoureuse de nos prestataires et fournisseurs',
              },
              {
                icon: '🤝',
                title: 'Accompagnement Personnalisé',
                description: 'Un interlocuteur dédié pour chaque projet',
              },
              {
                icon: '⚡',
                title: 'Réactivité',
                description: 'Disponibilité et flexibilité pour répondre à vos besoins',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-primary rounded-xl border border-secondary/20 
                           hover:border-secondary/50 transition-all duration-500 card-hover"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
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
              Une méthodologie éprouvée pour garantir le succès de votre événement
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-accent to-secondary transform -translate-x-1/2" />

            <div className="space-y-16">
              {[
                {
                  step: '01',
                  title: 'Consultation Initiale',
                  description: 'Nous écoutons vos besoins, vos envies et votre vision pour comprendre parfaitement vos attentes.',
                },
                {
                  step: '02',
                  title: 'Conception & Proposition',
                  description: 'Notre équipe créative élabore un concept unique et vous présente un devis détaillé.',
                },
                {
                  step: '03',
                  title: 'Planification Détaillée',
                  description: 'Nous coordonnons tous les aspects : lieu, décoration, restauration, animation, etc.',
                },
                {
                  step: '04',
                  title: 'Réalisation & Suivi',
                  description: 'Le jour J, notre équipe gère l\'ensemble de la logistique pour un événement parfait.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 text-center lg:text-right">
                    <div className={index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}>
                      <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-4">
                        <span className="text-secondary font-bold text-sm">Étape {item.step}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-secondary mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 w-16 h-16 rounded-full bg-secondary flex items-center justify-center 
                                  text-primary font-bold text-xl shadow-lg ring-4 ring-dark">
                    {item.step}
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-secondary/20 via-accent/10 to-secondary/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Prêt à Commencer Votre Projet ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour discuter de votre événement et recevoir un devis personnalisé gratuit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Demander un devis
              </Link>
              <Link href="/portfolio" className="btn-secondary text-lg px-10 py-4">
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}