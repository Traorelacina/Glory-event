'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const TikTokIcon = () => (
  <svg 
    className="w-5 h-5" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Accueil', path: 'home' },
    { name: 'Nos Services', path: 'services' },
    { name: 'Boutique', path: 'boutique' },
    { name: 'Galerie ', path: 'portfolio' },
    { name: 'Contact', path: 'contact' },
  ];

  const services = [
    'Wedding Planer',
    'Décoration sur mesure',
    'Cuisine et restauration',
    'Evènementiel',
    'Location d’ustensiles',
    'Location de tables et chaises',
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://web.facebook.com/AffoueRose107', name: 'Facebook' },
    { icon: TikTokIcon, url: 'https://www.tiktok.com/@kouakourose3?_r=1&_t=ZP-913v3HNoSB5', name: 'TikTok' },
  ];

  return (
    <footer className="bg-[#111827] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-4 bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
              Glory Events by Rose
            </h3>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-[#ad5945] hover:to-[#d38074] p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate?.(link.path)}
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-2 transform flex items-center group w-full text-left"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Nos Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="group">
                  <span className="text-gray-300 hover:text-white transition-all duration-200 cursor-default flex items-center">
                    <span className="w-1 h-1 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Amelia, Ohio (USA)<br />
                  45102 (Code postal)
                </span>
              </div>
              <a 
                href="tel:+15132073137"
                className="flex items-center space-x-3 group hover:no-underline"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  +1 513-207-3137
                </span>
              </a>
              <a 
                href="mailto:rosekouakou1093@hotmail.fr"
                className="flex items-center space-x-3 group hover:no-underline"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  rosekouakou1093@hotmail.fr
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Salem Technology. Tous droits réservés..
            </div>
            
          </div>
        </div>
      </div>

      {/* Points décoratifs */}
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
}