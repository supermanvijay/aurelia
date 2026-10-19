export type MenuCategory = 'all' | 'starters' | 'main' | 'desserts' | 'beverages' | 'combos';

export type CuisineType = 'Italian' | 'Indian' | 'Pan-Asian' | 'French' | 'Modern Fusion';

export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Signature' | 'Halal Friendly';

export interface MenuItem {
  id: string;
  name: string;
  subname?: string;
  description: string;
  price: number;
  category: MenuCategory;
  cuisine: CuisineType;
  dietary: DietaryTag[];
  image: string;
  pairingNote?: string;
  preparationTime?: string;
  featured?: boolean;
}

export type DiningArea = 'crystal-salon' | 'sommelier-vault' | 'chefs-counter' | 'glass-veranda';

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area: DiningArea;
  occasion: string;
  dietaryNotes: string;
  specialRequests: string;
}

export interface ConfirmedReservation extends ReservationFormData {
  bookingId: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending';
  depositWaived: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  source: 'Michelin Guide' | 'Google Reviews' | 'The Times Dining' | 'World 50 Best Discovery';
  comment: string;
  highlightedDish?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'interior' | 'events' | 'cocktails';
  image: string;
  caption: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  badge: string;
  date: string;
  time: string;
  price: string;
  description: string;
  availableSeats: number;
  includes: string[];
}
