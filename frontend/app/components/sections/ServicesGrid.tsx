'use client';

import Link from 'next/link';
import { SERVICES } from '../../lib/constants';
import styles from './ServicesGrid.module.css';

export default function ServicesGrid() {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nos Services Premium</h2>
          <p className={styles.sectionSubtitle}>
            Une expertise complète pour faire de chaque événement un moment d'exception
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {SERVICES.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className={styles.serviceCard}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              {/* Background Image */}
              <div className={styles.backgroundImage}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />
              </div>

              {/* Gradient Overlay */}
              <div className={styles.gradientOverlay} />

              {/* Content */}
              <div className={styles.content}>
                {/* Icon */}
                <div className={styles.icon}>
                  {service.icon}
                </div>

                {/* Text Content */}
                <div className={styles.textContent}>
                  <h3 className={styles.title}>
                    {service.title}
                  </h3>
                  <p className={styles.description}>
                    {service.shortDescription}
                  </p>
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                  <span className={styles.ctaText}>Découvrir</span>
                  <svg
                    className={styles.ctaIcon}
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
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={styles.decorativeCorner} />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <Link href="/services" className={styles.ctaButton}>
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}