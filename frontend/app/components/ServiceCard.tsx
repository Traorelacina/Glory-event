import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D89A79] transition-colors">
          {service.title}
        </h3>
        <p className="text-[#333333] mb-4 line-clamp-3">
          {service.description}
        </p>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-[#D89A79] font-medium hover:underline"
        >
          En savoir plus
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}