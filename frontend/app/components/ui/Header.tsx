'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../../lib/constants';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
  <Image 
    src="/logo_event.jpg" 
    alt="Glory Event Logo" 
    width={120} 
    height={40}
    className={styles.logoImage}
    priority
  />
</Link>

        {/* Navigation Desktop */}
        <nav className={styles.navDesktop}>
          {NAVIGATION_LINKS.map((link) => (
            <div key={link.href} className={styles.navItem}>
              {link.subLinks ? (
                <>
                  <button
                    className={`${styles.navLink} ${
                      pathname.startsWith(link.href) ? styles.active : ''
                    }`}
                    onMouseEnter={() => setActiveDropdown(link.label)}
                  >
                    {link.label}
                    <svg
                      className={styles.dropdownIcon}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {activeDropdown === link.label && (
                    <div
                      className={styles.dropdown}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={styles.dropdownItem}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ''
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons Desktop */}
        <div className={styles.ctaButtons}>
          <Link href="/contact" className={styles.btnContact}>
            Contactez-nous
          </Link>
          <Link href="/boutique" className={styles.btnBoutique}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {NAVIGATION_LINKS.map((link) => (
              <div key={link.href} className={styles.mobileNavItem}>
                {link.subLinks ? (
                  <>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => handleDropdown(link.label)}
                    >
                      {link.label}
                      <svg
                        className={`${styles.mobileDropdownIcon} ${
                          activeDropdown === link.label ? styles.rotate : ''
                        }`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    {activeDropdown === link.label && (
                      <div className={styles.mobileDropdown}>
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className={styles.mobileDropdownItem}
                            onClick={toggleMobileMenu}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className={styles.mobileCta}>
            <Link
              href="/contact"
              className={styles.btnContact}
              onClick={toggleMobileMenu}
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}