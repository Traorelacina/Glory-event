import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Search, Loader, AlertCircle, Trash2, Mail, Phone, MessageSquare, Calendar, User } from 'lucide-react';

interface Contact {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const { token } = useAuthStore();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [token]);

  const fetchContacts = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setContacts(data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirmer la suppression?')) return;
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setContacts(contacts.filter((c) => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sujet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-xl p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare size={36} />
              Gestion Contacts
            </h1>
            <p className="text-orange-100 mt-1 text-lg">{contacts.length} messages reçus</p>
          </div>

          {error && (
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl shadow-lg flex gap-4">
              <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-orange-900 font-semibold text-lg mb-1">Erreur</p>
                <p className="text-orange-700">{error}</p>
              </div>
            </div>
          )}

          {/* Recherche */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-orange-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou sujet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-lg">
              <Loader className="animate-spin text-orange-500 mb-4" size={50} />
              <p className="text-gray-600 font-medium">Chargement des contacts...</p>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-102 ${
                    selectedContact?.id === contact.id
                      ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400 shadow-lg'
                      : 'bg-white border-orange-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="text-orange-600" size={18} />
                        <h3 className="font-bold text-gray-800 text-lg">{contact.nom}</h3>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{contact.sujet}</p>
                      <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                        <Mail size={14} />
                        {contact.email}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-xs font-medium bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-orange-200">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 font-medium text-lg">Aucun contact trouvé</p>
            </div>
          )}
        </div>

        {/* Détails du contact */}
        {selectedContact ? (
          <div className="bg-white border-2 border-orange-300 rounded-xl shadow-xl p-6 h-fit sticky top-24">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-orange-600" size={24} />
                Détails
              </h2>
              <button
                onClick={() => handleDelete(selectedContact.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition text-red-600 border-2 border-red-300"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Nom</p>
                </div>
                <p className="text-gray-800 font-bold text-lg">{selectedContact.nom}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Email</p>
                </div>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-orange-600 hover:text-orange-700 font-semibold text-lg hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              {selectedContact.telephone && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="text-orange-600" size={18} />
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Téléphone</p>
                  </div>
                  <a href={`tel:${selectedContact.telephone}`} className="text-orange-600 hover:text-orange-700 font-semibold text-lg hover:underline">
                    {selectedContact.telephone}
                  </a>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Sujet</p>
                </div>
                <p className="text-gray-800 font-semibold">{selectedContact.sujet}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-3">Message</p>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Date de réception</p>
                </div>
                <p className="text-gray-800 font-semibold">{new Date(selectedContact.created_at).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8 h-fit text-center">
            <MessageSquare className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 font-medium">Sélectionnez un contact pour voir les détails</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}