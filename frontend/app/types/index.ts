// Types pour les services
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  gallery?: string[];
}

// Types pour les produits (parfums)
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
}

// Types pour le panier
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Types pour les commandes
export interface Order {
  id?: string;
  customerName: string;
  phone: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt?: string;
}

// Types pour les demandes de devis
export interface QuoteRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string;
  guestCount?: number;
  message: string;
  status?: 'pending' | 'processing' | 'quoted' | 'closed';
  createdAt?: string;
}

// Types pour le portfolio
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'mariage' | 'reunion' | 'professionnel' | 'autre';
  description: string;
  date: string;
  images: string[];
  videos?: string[];
  featured?: boolean;
}

// Types pour la galerie
export interface GalleryMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  category: string;
}

// Types pour l'authentification admin
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface AuthResponse {
  token: string;
  user: Admin;
}

// Types pour les statistiques du dashboard
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: Order[];
  recentQuotes: QuoteRequest[];
}

// Types pour les formulaires
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// Types pour la navigation
export interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
}

// Types API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}