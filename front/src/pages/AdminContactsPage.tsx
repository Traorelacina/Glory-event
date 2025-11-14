import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import { Search, Loader, AlertCircle, Trash2, Mail, Phone, MessageSquare, Calendar, User, Eye, EyeOff } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  is_read: boolean; // Nouveau champ pour suivre l'état de lecture
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

  const handleMarkAsRead = async (id: number) => {
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/contacts/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_read: true }),
      });

      if (!response.ok) throw new Error('Erreur lors du marquage comme lu');

      // Mettre à jour l'état local
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, is_read: true } : contact
      ));
      
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, is_read: true });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMarkAsUnread = async (id: number) => {
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/contacts/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_read: false }),
      });

      if (!response.ok) throw new Error('Erreur lors du marquage comme non lu');

      // Mettre à jour l'état local
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, is_read: false } : contact
      ));
      
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, is_read: false });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Marquer automatiquement comme lu quand on sélectionne
    if (!contact.is_read) {
      handleMarkAsRead(contact.id);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (!contact) return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (contact.name?.toLowerCase() || '').includes(searchLower) ||
      (contact.email?.toLowerCase() || '').includes(searchLower) ||
      (contact.subject?.toLowerCase() || '').includes(searchLower) ||
      (contact.message?.toLowerCase() || '').includes(searchLower)
    );
  });

  // Compter les messages non lus
  const unreadCount = contacts.filter(contact => !contact.is_read).length;
  const readCount = contacts.filter(contact => contact.is_read).length;

  // Fonction pour formater les données de contact
  const formatContactData = (contact: Contact) => {
    return {
      id: contact.id || 0,
      name: contact.name || 'Non spécifié',
      email: contact.email || 'Non spécifié',
      phone: contact.phone || '',
      subject: contact.subject || 'Sans sujet',
      message: contact.message || 'Aucun message',
      service: contact.service || '',
      is_read: contact.is_read || false,
      created_at: contact.created_at || new Date().toISOString()
    };
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header avec compteurs */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <MessageSquare size={36} />
                  Gestion Contacts
                </h1>
                <div className="flex gap-4 mt-3">
                  <div className="bg-orange-600/30 px-3 py-1 rounded-full">
                    <span className="font-bold">{contacts.length}</span> messages total
                  </div>
                  <div className="bg-red-500/30 px-3 py-1 rounded-full">
                    <span className="font-bold">{unreadCount}</span> non lus
                  </div>
                  <div className="bg-green-500/30 px-3 py-1 rounded-full">
                    <span className="font-bold">{readCount}</span> lus
                  </div>
                </div>
              </div>
            </div>
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

          {/* Recherche et filtres */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-orange-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
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
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-lg">
              <Loader className="animate-spin text-orange-500 mb-4" size={50} />
              <p className="text-gray-600 font-medium">Chargement des contacts...</p>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="space-y-3">
              {filteredContacts.map((contact) => {
                const formattedContact = formatContactData(contact);
                const isUnread = !formattedContact.is_read;
                
                return (
                  <div
                    key={formattedContact.id}
                    onClick={() => handleContactSelect(formattedContact)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-102 ${
                      selectedContact?.id === formattedContact.id
                        ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400 shadow-lg'
                        : isUnread
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 shadow-md'
                        : 'bg-white border-orange-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className={isUnread ? "text-red-600" : "text-orange-600"} size={18} />
                          <h3 className="font-bold text-gray-800 text-lg">{formattedContact.name}</h3>
                          {isUnread && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              NOUVEAU
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{formattedContact.subject}</p>
                        <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                          <Mail size={14} />
                          {formattedContact.email}
                        </div>
                        {formattedContact.service && (
                          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-1">
                            <MessageSquare size={14} />
                            Service: {formattedContact.service}
                          </div>
                        )}
                      </div>
                      <div className="text-right space-y-2">
                        <span className="text-gray-500 text-xs font-medium bg-gray-100 px-3 py-1 rounded-full block">
                          {new Date(formattedContact.created_at).toLocaleDateString('fr-FR')}
                        </span>
                        <div className="flex gap-1 justify-end">
                          {isUnread ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(formattedContact.id);
                              }}
                              className="p-1 hover:bg-green-100 rounded text-green-600"
                              title="Marquer comme lu"
                            >
                              <Eye size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsUnread(formattedContact.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              title="Marquer comme non lu"
                            >
                              <EyeOff size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-orange-200">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 font-medium text-lg">
                {searchTerm ? 'Aucun contact trouvé pour votre recherche' : 'Aucun contact trouvé'}
              </p>
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
                {!selectedContact.is_read && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    NON LU
                  </span>
                )}
              </h2>
              <div className="flex gap-2">
                {selectedContact.is_read ? (
                  <button
                    onClick={() => handleMarkAsUnread(selectedContact.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 border-2 border-gray-300"
                    title="Marquer comme non lu"
                  >
                    <EyeOff size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAsRead(selectedContact.id)}
                    className="p-2 hover:bg-green-100 rounded-lg transition text-green-600 border-2 border-green-300"
                    title="Marquer comme lu"
                  >
                    <Eye size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition text-red-600 border-2 border-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Nom</p>
                </div>
                <p className="text-gray-800 font-bold text-lg">{selectedContact.name}</p>
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

              {selectedContact.phone && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="text-orange-600" size={18} />
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Téléphone</p>
                  </div>
                  <a href={`tel:${selectedContact.phone}`} className="text-orange-600 hover:text-orange-700 font-semibold text-lg hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-orange-600" size={18} />
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Service demandé</p>
                </div>
                <p className="text-gray-800 font-semibold">{selectedContact.subject}</p>
              </div>

              {selectedContact.service && selectedContact.service !== selectedContact.subject && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="text-blue-600" size={18} />
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Service supplémentaire</p>
                  </div>
                  <p className="text-gray-800 font-semibold">{selectedContact.service}</p>
                </div>
              )}

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