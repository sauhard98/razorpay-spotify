// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  topArtists: string[]; // Artist IDs
  location: { city: string; lat: number; lng: number };
  friendsGoing: { eventId: string; friendNames: string[] }[];
  purchasedTickets: PurchasedTicket[];
}

// Event Types
export interface Event {
  id: string;
  artistName: string;
  artistId: string;
  artistImage: string;
  venueName: string;
  venueCapacity: number;
  city: string;
  state: string;
  date: string; // ISO format
  time: string;
  genre: string[];
  basePrice: number;
  currentPhase: 'early-bird' | 'phase-1' | 'phase-2';
  ticketsAvailable: number;
  ticketsSold: number;
  fillRate: number; // Calculated
  userFanScore: number; // 0-100, determines discount
  isTrending: boolean;
  isNearby: boolean; // Within 50 miles
  friendsGoing: string[]; // Friend names
  setlistPreview: string[]; // 5-8 song names
  videoPreviewUrl: string;
  previousShowImages: string[];
  about?: string;
  expectedDuration?: string;
  ageRestriction?: string;
}

// Ticket Types
export interface PurchasedTicket {
  id: string;
  eventId: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  qrCode: string; // Generated QR code data
  section: string;
  row: string;
  seats: string[];
  status: 'upcoming' | 'past';
}

// Cart Types
export interface CartItem {
  eventId: string;
  quantity: number;
  section: string;
  selectedSeats: string[];
  pricePerTicket: number;
}

// Filter Types
export interface FilterState {
  category: 'all' | 'this-weekend' | 'next-30-days' | 'top-artists' | string;
  genres: string[];
  priceRange: 'all' | 'under-50' | '50-100' | '100-plus';
  nearYou: boolean;
  sortBy: 'recommended' | 'date' | 'price-low' | 'price-high';
}

// Search Types
export interface RecentSearch {
  query: string;
  timestamp: number;
  type: 'artist' | 'venue' | 'city';
}

// Venue Section Types
export interface VenueSection {
  id: string;
  name: string;
  price: number;
  available: number;
  total: number;
}
