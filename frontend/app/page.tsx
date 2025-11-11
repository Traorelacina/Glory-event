'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Hero from './components/sections/Hero';
import ServicesGrid from './components/sections/ServicesGrid';
import Link from 'next/link';
import styles from './page.module.css';

// Animations variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function HomePage() {
  // Refs pour les animations
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const boutiqueRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Hook pour détecter quand les éléments sont dans la vue
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });
  const boutiqueInView = useInView(boutiqueRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Animation de parallaxe pour le hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <>
      {/* Hero Section avec animations */}
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className={styles.heroBackground}
          style={{ y: y1 }}
        />
        <div className={styles.heroOverlay} />
        <motion.div 
          className={`container-custom ${styles.heroContent}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Glory Event
            <br />
            <motion.span 
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              L'Excellence en Organisation d'Événements
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Transformez vos rêves en réalité avec notre expertise en organisation 
            d'événements premium, mariages inoubliables et décoration d'exception.
          </motion.p>
          
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-primary">
                Demander un devis
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/services" className="btn-secondary">
                Nos services
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating elements animés */}
        <motion.div
          className={styles.floatingElement1}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={styles.floatingElement2}
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.section>

      {/* Services Section */}
      <ServicesGrid />

      {/* About Preview Section avec animations */}
      <motion.section 
        ref={aboutRef}
        className={styles.aboutSection}
        initial="initial"
        animate={aboutInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className={styles.aboutImage}>
                <motion.div 
                  className={styles.portfolioImage} 
                  style={{ backgroundImage: 'url(/images/about/about-main.jpg)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className={styles.floatingStats}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <p className={styles.statsNumber}>10+</p>
                  <p className={styles.statsText}>Années d'expérience</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              className={styles.aboutContent}
              variants={staggerContainer}
            >
              <motion.h2 
                className={styles.aboutTitle}
                variants={fadeInUp}
              >
                Glory Event, Votre Partenaire d'Excellence
              </motion.h2>
              
              <motion.p 
                className={styles.aboutText}
                variants={fadeInUp}
              >
                Depuis plus d'une décennie, nous transformons vos rêves en réalité. 
                Spécialisés dans l'organisation d'événements premium, nous mettons notre 
                expertise et notre créativité au service de vos moments les plus précieux.
              </motion.p>
              
              <motion.p 
                className={styles.aboutText}
                variants={fadeInUp}
              >
                Que ce soit pour un mariage inoubliable, une réunion professionnelle 
                impactante ou un événement sur-mesure, notre équipe dévouée s'engage 
                à dépasser vos attentes avec élégance et professionnalisme.
              </motion.p>
              
              <motion.div 
                className={styles.featuresGrid}
                variants={staggerContainer}
              >
                {[
                  { text: "Équipe Expérimentée" },
                  { text: "Service Premium" },
                  { text: "Satisfaction Garantie" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className={styles.featureItem}
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className={styles.featureIcon}>
                      <motion.svg 
                        className="w-6 h-6 text-secondary" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                    <span className={styles.featureText}>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about" className="btn-primary">
                  En savoir plus sur nous
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Portfolio Preview Section avec animations */}
      <motion.section 
        ref={portfolioRef}
        className="py-20 bg-primary"
        initial="initial"
        animate={portfolioInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="section-title">Nos Dernières Réalisations</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Découvrez quelques-uns des événements exceptionnels que nous avons eu le privilège d'organiser
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Link
                  href="/portfolio"
                  className="group relative h-80 rounded-xl overflow-hidden card-hover block"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(/images/portfolio/portfolio-${item}.jpg)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                    whileHover={{ y: 0 }}
                  >
                    <p className="text-accent text-sm font-semibold mb-2">Mariage</p>
                    <h3 className="text-white text-xl font-bold mb-2">Événement Élégant</h3>
                    <motion.p 
                      className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      Une célébration inoubliable
                    </motion.p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/portfolio" className="btn-primary">
                Voir tout le portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Boutique Preview Section avec animations */}
      <motion.section 
        ref={boutiqueRef}
        className="py-20 bg-dark"
        initial="initial"
        animate={boutiqueInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="section-title">Notre Boutique de Parfums</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Découvrez notre collection exclusive de fragrances de luxe
            </p>
          </motion.div>

          {/* Products Grid Preview */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                variants={scaleIn}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <div
                  className="group bg-primary border border-secondary/20 rounded-xl overflow-hidden 
                             hover:border-secondary/50 transition-all duration-500 card-hover"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(/images/produits/parfum-${item}.jpg)`,
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-accent transition-colors">
                      Parfum Premium {item}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">Eau de Parfum - 100ml</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-accent">45 000 FCFA</p>
                      <motion.button 
                        className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary hover:text-primary transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Voir
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/boutique" className="btn-primary">
                Découvrir la boutique
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section avec animations */}
      <motion.section 
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-primary via-dark to-primary relative overflow-hidden"
        initial="initial"
        animate={ctaInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'url(/images/pattern.png)',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-secondary mb-6"
              variants={fadeInUp}
            >
              Prêt à Créer Votre Événement de Rêve ?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              variants={fadeInUp}
            >
              Contactez-nous dès aujourd'hui pour discuter de votre projet et 
              recevoir un devis personnalisé gratuitement.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                  Demander un devis gratuit
                </Link>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="tel:+225XXXXXXXXX" className="btn-secondary text-lg px-10 py-4">
                  Appelez-nous
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Particules animées en arrière-plan */}
        <ParticlesBackground />
      </motion.section>
    </>
  );
}

// Composant pour les particules animées
function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}