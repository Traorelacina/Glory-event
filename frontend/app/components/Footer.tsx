import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Glory Event <span className="cursive-title text-[#D89A79]">by Rose</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'organisation d'événements premium et inoubliables.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Nos Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/evenementiel"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Événementiel
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mariage"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Organisation de mariage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/decoration"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Décoration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/restauration"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Restauration
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/boutique"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Boutique Parfums
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#D89A79] transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <span className="font-medium text-white">Email:</span>
                <br />
                contact@gloryeventbyrose.com
              </li>
              <li className="text-gray-400">
                <span className="font-medium text-white">Téléphone:</span>
                <br />
                +225 XX XX XX XX XX
              </li>
              <li className="text-gray-400">
                <span className="font-medium text-white">Adresse:</span>
                <br />
                Abidjan, Côte d'Ivoire
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Glory Event by Rose. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}