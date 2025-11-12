import { useState } from 'react';
import { Event } from '../types';

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'Mariage Sophie & Thomas',
      date: '2024-06-15',
      type: 'Mariage',
      images: [
        'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: '2',
      title: 'Lancement Produit TechCorp',
      date: '2024-05-20',
      type: 'Réunion Pro',
      images: [
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: '3',
      title: 'Anniversaire 50 ans Marie',
      date: '2024-04-10',
      type: 'Réunion',
      images: [
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: '4',
      title: 'Gala de Charité',
      date: '2024-03-22',
      type: 'Autres',
      images: [
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: '5',
      title: 'Mariage Laura & Pierre',
      date: '2024-02-14',
      type: 'Mariage',
      images: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: '6',
      title: 'Séminaire Innovation',
      date: '2024-01-18',
      type: 'Réunion Pro',
      images: [
        'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
  ];

  const filters = ['all', 'Mariage', 'Réunion', 'Réunion Pro', 'Autres'];

  const filteredEvents =
    selectedFilter === 'all'
      ? events
      : events.filter((event) => event.type === selectedFilter);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#111827] mb-6">
            Galerie Événements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos créations et laissez-vous inspirer par nos réalisations passées
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {filter === 'all' ? 'Tous' : filter}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-full text-sm font-medium mb-4 w-fit">
                    {event.type}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {new Date(event.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Un événement mémorable orchestré avec passion et professionnalisme.
                    Chaque détail a été pensé pour créer une expérience unique et inoubliable.
                  </p>
                </div>

                <div className={`grid grid-cols-2 gap-2 p-4 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  {event.images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                        idx === 0 ? 'col-span-2 h-80' : 'h-48'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${event.title} ${idx + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              Aucun événement trouvé pour cette catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
