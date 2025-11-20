import type { Event, User } from './types';

// Artist Data
export const artists = [
  {
    id: 'the-1975',
    name: 'The 1975',
    genre: ['Pop', 'Rock', 'Indie'],
    image: 'https://picsum.photos/seed/the1975/800/800',
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    genre: ['Pop', 'Alternative'],
    image: 'https://picsum.photos/seed/billieeilish/800/800',
  },
  {
    id: 'bad-bunny',
    name: 'Bad Bunny',
    genre: ['Hip-Hop', 'Latin'],
    image: 'https://picsum.photos/seed/badbunny/800/800',
  },
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    genre: ['Pop', 'Country'],
    image: 'https://picsum.photos/seed/taylorswift/800/800',
  },
  {
    id: 'ed-sheeran',
    name: 'Ed Sheeran',
    genre: ['Pop', 'Folk'],
    image: 'https://picsum.photos/seed/edsheeran/800/800',
  },
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    genre: ['R&B', 'Pop'],
    image: 'https://picsum.photos/seed/theweeknd/800/800',
  },
  {
    id: 'phoebe-bridgers',
    name: 'Phoebe Bridgers',
    genre: ['Indie', 'Folk'],
    image: 'https://picsum.photos/seed/phoebebridgers/800/800',
  },
  {
    id: 'drake',
    name: 'Drake',
    genre: ['Hip-Hop', 'R&B'],
    image: 'https://picsum.photos/seed/drake/800/800',
  },
  {
    id: 'olivia-rodrigo',
    name: 'Olivia Rodrigo',
    genre: ['Pop', 'Rock'],
    image: 'https://picsum.photos/seed/oliviarodrigo/800/800',
  },
  {
    id: 'arctic-monkeys',
    name: 'Arctic Monkeys',
    genre: ['Rock', 'Indie'],
    image: 'https://picsum.photos/seed/arcticmonkeys/800/800',
  },
  {
    id: 'harry-styles',
    name: 'Harry Styles',
    genre: ['Pop', 'Rock'],
    image: 'https://picsum.photos/seed/harrystyles/800/800',
  },
  {
    id: 'sza',
    name: 'SZA',
    genre: ['R&B', 'Hip-Hop'],
    image: 'https://picsum.photos/seed/sza/800/800',
  },
  {
    id: 'dua-lipa',
    name: 'Dua Lipa',
    genre: ['Pop', 'Dance'],
    image: 'https://picsum.photos/seed/dualipa/800/800',
  },
  {
    id: 'post-malone',
    name: 'Post Malone',
    genre: ['Hip-Hop', 'Pop'],
    image: 'https://picsum.photos/seed/postmalone/800/800',
  },
  {
    id: 'lana-del-rey',
    name: 'Lana Del Rey',
    genre: ['Pop', 'Alternative'],
    image: 'https://picsum.photos/seed/lanadelrey/800/800',
  },
  {
    id: 'kendrick-lamar',
    name: 'Kendrick Lamar',
    genre: ['Hip-Hop', 'Rap'],
    image: 'https://picsum.photos/seed/kendricklamar/800/800',
  },
  {
    id: 'frank-ocean',
    name: 'Frank Ocean',
    genre: ['R&B', 'Alternative'],
    image: 'https://picsum.photos/seed/frankocean/800/800',
  },
  {
    id: 'fleetwood-mac',
    name: 'Fleetwood Mac',
    genre: ['Rock', 'Classic'],
    image: 'https://picsum.photos/seed/fleetwoodmac/800/800',
  },
  {
    id: 'tame-impala',
    name: 'Tame Impala',
    genre: ['Electronic', 'Rock'],
    image: 'https://picsum.photos/seed/tameimpala/800/800',
  },
  {
    id: 'radiohead',
    name: 'Radiohead',
    genre: ['Rock', 'Alternative'],
    image: 'https://picsum.photos/seed/radiohead/800/800',
  },
];

// Venue Data
const venues = [
  { name: 'Brooklyn Steel', city: 'Brooklyn', state: 'NY', capacity: 1800, lat: 40.7128, lng: -73.9352 },
  { name: 'Madison Square Garden', city: 'New York', state: 'NY', capacity: 20000, lat: 40.7505, lng: -73.9934 },
  { name: 'Red Rocks Amphitheatre', city: 'Morrison', state: 'CO', capacity: 9525, lat: 39.6654, lng: -105.2056 },
  { name: 'The Wiltern', city: 'Los Angeles', state: 'CA', capacity: 1850, lat: 34.0622, lng: -118.3087 },
  { name: 'The Fillmore', city: 'San Francisco', state: 'CA', capacity: 1315, lat: 37.7841, lng: -122.4331 },
  { name: 'House of Blues', city: 'Boston', state: 'MA', capacity: 2425, lat: 42.3478, lng: -71.0466 },
  { name: 'The Ryman', city: 'Nashville', state: 'TN', capacity: 2362, lat: 36.1612, lng: -86.7775 },
  { name: 'Terminal 5', city: 'New York', state: 'NY', capacity: 3000, lat: 40.7682, lng: -73.9899 },
  { name: 'The Anthem', city: 'Washington', state: 'DC', capacity: 6000, lat: 38.8826, lng: -77.0128 },
  { name: 'Hollywood Bowl', city: 'Los Angeles', state: 'CA', capacity: 17500, lat: 34.1128, lng: -118.3391 },
];

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Generate setlist based on artist
function generateSetlist(artistName: string): string[] {
  const setlists: { [key: string]: string[] } = {
    'The 1975': ['Love It If We Made It', 'Somebody Else', 'Chocolate', 'The Sound', 'Sex', 'Robbers', 'Girls', 'It\'s Not Living'],
    'Billie Eilish': ['bad guy', 'when the party\'s over', 'bury a friend', 'ocean eyes', 'lovely', 'everything i wanted', 'Happier Than Ever'],
    'Taylor Swift': ['Shake It Off', 'Blank Space', 'Love Story', 'You Belong with Me', 'Anti-Hero', 'Cruel Summer', 'Wildest Dreams'],
    'The Weeknd': ['Blinding Lights', 'Starboy', 'The Hills', 'Can\'t Feel My Face', 'Save Your Tears', 'Earned It', 'I Feel It Coming'],
    // Add more as needed
  };
  
  return setlists[artistName] || ['Opening', 'Hit Single', 'Fan Favorite', 'Ballad', 'New Song', 'Classic Hit', 'Encore'];
}

// Generate mock events
export function generateMockEvents(userLocation: { lat: number; lng: number }, userTopArtists: string[]): Event[] {
  const events: Event[] = [];
  const now = new Date();
  
  artists.forEach((artist, artistIndex) => {
    // Generate 2-3 events per artist
    const eventCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < eventCount; i++) {
      const venue = venues[Math.floor(Math.random() * venues.length)];
      const daysFromNow = Math.floor(Math.random() * 90) - 30; // -30 to +60 days
      const eventDate = new Date(now);
      eventDate.setDate(eventDate.getDate() + daysFromNow);
      
      const ticketsTotal = venue.capacity;
      const soldPercentage = 0.4 + Math.random() * 0.55; // 40-95%
      const ticketsSold = Math.floor(ticketsTotal * soldPercentage);
      const ticketsAvailable = ticketsTotal - ticketsSold;
      
      const basePrice = 45 + Math.floor(Math.random() * 205); // $45-$250
      const distance = calculateDistance(userLocation.lat, userLocation.lng, venue.lat, venue.lng);
      const isNearby = distance < 50;
      const isFanFavorite = userTopArtists.includes(artist.id);
      const fanScore = isFanFavorite ? 75 + Math.floor(Math.random() * 25) : Math.floor(Math.random() * 50);
      
      // Determine friends going (random)
      const friendsGoing: string[] = [];
      if (Math.random() > 0.7) {
        const friendCount = Math.floor(Math.random() * 3) + 1;
        const friendNames = ['Sarah', 'Mike', 'Emma', 'Jake', 'Olivia', 'Chris', 'Maya', 'Alex'];
        for (let j = 0; j < friendCount; j++) {
          friendsGoing.push(friendNames[Math.floor(Math.random() * friendNames.length)]);
        }
      }
      
      events.push({
        id: `event-${artistIndex}-${i}-${Date.now()}`,
        artistName: artist.name,
        artistId: artist.id,
        artistImage: artist.image,
        venueName: venue.name,
        venueCapacity: venue.capacity,
        city: venue.city,
        state: venue.state,
        date: eventDate.toISOString(),
        time: ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'][Math.floor(Math.random() * 4)],
        genre: artist.genre,
        basePrice,
        currentPhase: ['early-bird', 'phase-1', 'phase-2'][Math.floor(Math.random() * 3)] as 'early-bird' | 'phase-1' | 'phase-2',
        ticketsAvailable,
        ticketsSold,
        fillRate: soldPercentage * 100,
        userFanScore: fanScore,
        isTrending: soldPercentage > 0.75 && daysFromNow > 0 && daysFromNow < 30,
        isNearby,
        friendsGoing,
        setlistPreview: generateSetlist(artist.name),
        videoPreviewUrl: `https://player.vimeo.com/video/76979871`,
        previousShowImages: Array.from({ length: 8 }, (_, idx) => 
          `https://picsum.photos/seed/${artist.id}-${idx}/600/400`
        ),
        about: `${artist.name} is bringing their incredible live performance to ${venue.city}. Experience an unforgettable night of music featuring hits from their latest album and classic fan favorites.`,
        expectedDuration: '2-2.5 hours',
        ageRestriction: venue.capacity > 5000 ? 'All ages' : '18+',
      });
    }
  });
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Mock User
export const mockUser: User = {
  id: 'user-001',
  name: 'Alex Johnson',
  email: 'alex@spotify.com',
  isPremium: true,
  topArtists: ['the-1975', 'billie-eilish', 'phoebe-bridgers', 'taylor-swift', 'the-weeknd'],
  location: {
    city: 'Brooklyn, NY',
    lat: 40.6782,
    lng: -73.9442,
  },
  friendsGoing: [
    { eventId: 'event-001', friendNames: ['Sarah', 'Mike'] },
    { eventId: 'event-015', friendNames: ['Emma'] },
    { eventId: 'event-032', friendNames: ['Jake', 'Olivia', 'Chris'] },
  ],
  purchasedTickets: [],
};

// Export function to get events with user context
export function getMockEvents(): Event[] {
  return generateMockEvents(mockUser.location, mockUser.topArtists);
}

// Get artist by ID
export function getArtistById(id: string) {
  return artists.find(a => a.id === id);
}

// Mock playlists for homepage
export const mockPlaylists = [
  { id: '1', name: 'Daily Mix 1', imageUrl: 'https://picsum.photos/seed/playlist1/300/300', description: 'The 1975, Arctic Monkeys and more' },
  { id: '2', name: 'Liked Songs', imageUrl: 'https://picsum.photos/seed/playlist2/300/300', description: '847 liked songs' },
  { id: '3', name: 'Discover Weekly', imageUrl: 'https://picsum.photos/seed/playlist3/300/300', description: 'Your weekly mixtape' },
  { id: '4', name: 'Release Radar', imageUrl: 'https://picsum.photos/seed/playlist4/300/300', description: 'New music from artists you love' },
  { id: '5', name: 'Indie Vibes', imageUrl: 'https://picsum.photos/seed/playlist5/300/300', description: 'The best indie hits' },
  { id: '6', name: 'Chill Hits', imageUrl: 'https://picsum.photos/seed/playlist6/300/300', description: 'Kick back to the best new and recent chill hits' },
];

// Mock current playing
export const mockCurrentPlaying = {
  song: 'Somebody Else',
  artist: 'The 1975',
  imageUrl: 'https://picsum.photos/seed/current/300/300',
  progress: 45,
  duration: 210,
};
