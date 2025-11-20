'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Event, CartItem, PurchasedTicket, FilterState } from './types';
import { mockUser, getMockEvents, mockPlaylists, mockCurrentPlaying } from './mockData';

interface AppState {
  user: User;
  events: Event[];
  cart: CartItem[];
  savedEvents: string[];
  purchasedTickets: PurchasedTicket[];
  filters: FilterState;
  showModal: boolean;
  mockPlaylists: typeof mockPlaylists;
  mockCurrentPlaying: typeof mockCurrentPlaying;
  setUser: (user: User) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (eventId: string) => void;
  updateCartItem: (eventId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  toggleSaveEvent: (eventId: string) => void;
  addPurchasedTicket: (ticket: PurchasedTicket) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setShowModal: (show: boolean) => void;
  dismissModal: (permanent?: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'spotify-live-user',
  CART: 'spotify-live-cart',
  SAVED_EVENTS: 'spotify-live-saved-events',
  PURCHASED_TICKETS: 'spotify-live-purchased-tickets',
  MODAL_DISMISSED: 'spotify-live-modal-dismissed',
  MODAL_DISMISSED_PERMANENT: 'spotify-live-modal-dismissed-permanent',
  FILTERS: 'spotify-live-filters',
};

const defaultFilters: FilterState = {
  category: 'all',
  genres: [],
  priceRange: 'all',
  nearYou: false,
  sortBy: 'recommended',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(mockUser);
  const [events, setEvents] = useState<Event[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([]);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [showModal, setShowModalState] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      const savedEventIds = localStorage.getItem(STORAGE_KEYS.SAVED_EVENTS);
      const savedTickets = localStorage.getItem(STORAGE_KEYS.PURCHASED_TICKETS);
      const savedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);

      if (savedUser) setUserState(JSON.parse(savedUser));
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedEventIds) setSavedEvents(JSON.parse(savedEventIds));
      if (savedTickets) setPurchasedTickets(JSON.parse(savedTickets));
      if (savedFilters) setFiltersState(JSON.parse(savedFilters));

      // Generate events
      const generatedEvents = getMockEvents();
      setEvents(generatedEvents);

      // Check if modal should be shown
      const modalDismissedPermanent = localStorage.getItem(STORAGE_KEYS.MODAL_DISMISSED_PERMANENT);
      const modalDismissedTemp = localStorage.getItem(STORAGE_KEYS.MODAL_DISMISSED);
      
      if (!modalDismissedPermanent) {
        if (modalDismissedTemp) {
          const dismissedTime = parseInt(modalDismissedTemp);
          const now = Date.now();
          // Show modal if more than 24 hours have passed
          if (now - dismissedTime > 24 * 60 * 60 * 1000) {
            setTimeout(() => setShowModalState(true), 3000);
          }
        } else {
          // First time visitor
          setTimeout(() => setShowModalState(true), 3000);
        }
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      setEvents(getMockEvents());
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify(savedEvents));
      localStorage.setItem(STORAGE_KEYS.PURCHASED_TICKETS, JSON.stringify(purchasedTickets));
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [user, cart, savedEvents, purchasedTickets, filters, isInitialized]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.eventId === item.eventId);
      if (existing) {
        return prev.map(i => i.eventId === item.eventId ? { ...i, ...item } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (eventId: string) => {
    setCart(prev => prev.filter(item => item.eventId !== eventId));
  };

  const updateCartItem = (eventId: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(item => 
      item.eventId === eventId ? { ...item, ...updates } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      }
      return [...prev, eventId];
    });
  };

  const addPurchasedTicket = (ticket: PurchasedTicket) => {
    setPurchasedTickets(prev => [...prev, ticket]);
    setUserState(prev => ({
      ...prev,
      purchasedTickets: [...prev.purchasedTickets, ticket],
    }));
  };

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const setShowModal = (show: boolean) => {
    setShowModalState(show);
  };

  const dismissModal = (permanent = false) => {
    setShowModalState(false);
    if (typeof window === 'undefined') return;

    if (permanent) {
      localStorage.setItem(STORAGE_KEYS.MODAL_DISMISSED_PERMANENT, 'true');
    } else {
      localStorage.setItem(STORAGE_KEYS.MODAL_DISMISSED, Date.now().toString());
    }
  };

  const value: AppState = {
    user,
    events,
    cart,
    savedEvents,
    purchasedTickets,
    filters,
    showModal,
    mockPlaylists,
    mockCurrentPlaying,
    setUser,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    toggleSaveEvent,
    addPurchasedTicket,
    setFilters,
    setShowModal,
    dismissModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
