"use client";

import { useState, useMemo } from "react";
import { useApp } from "@/lib/context";
import { TopNav } from "@/components/TopNav";
import { Event } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Heart, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function LivePage() {
    const { events, user, savedEvents, toggleSaveEvent } = useApp();
    const searchParams = useSearchParams();
    const artistFilter = searchParams.get("artist");

    const [activeGenre, setActiveGenre] = useState<string>("all");
    const [priceFilter, setPriceFilter] = useState<string>("all");
    const [showOnlyNearby, setShowOnlyNearby] = useState(false);

    const genres = ["all", "pop", "rock", "hip-hop", "electronic", "indie", "alternative"];

    const filteredEvents = useMemo(() => {
        let filtered = events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate > new Date(); // Only upcoming events
        });

        if (artistFilter) {
            filtered = filtered.filter((event) => event.artistId === artistFilter);
        }

        if (activeGenre !== "all") {
            filtered = filtered.filter((event) => event.genre.some((g) => g.toLowerCase() === activeGenre));
        }

        if (showOnlyNearby) {
            filtered = filtered.filter((event) => event.isNearby);
        }

        if (priceFilter === "under-50") {
            filtered = filtered.filter((event) => event.basePrice < 50);
        } else if (priceFilter === "50-100") {
            filtered = filtered.filter((event) => event.basePrice >= 50 && event.basePrice <= 100);
        } else if (priceFilter === "over-100") {
            filtered = filtered.filter((event) => event.basePrice > 100);
        }

        return filtered.sort((a, b) => {
            // Prioritize events by top artists
            const aIsTopArtist = user.topArtists.includes(a.artistId);
            const bIsTopArtist = user.topArtists.includes(b.artistId);
            if (aIsTopArtist && !bIsTopArtist) return -1;
            if (!aIsTopArtist && bIsTopArtist) return 1;

            // Then by fan score
            return b.userFanScore - a.userFanScore;
        });
    }, [events, activeGenre, priceFilter, showOnlyNearby, artistFilter, user.topArtists]);

    const topArtistEvents = filteredEvents.filter((event) => user.topArtists.includes(event.artistId));
    const thisWeekendEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 7;
    });
    const nearbyEvents = filteredEvents.filter((event) => event.isNearby);

    const EventCard = ({ event }: { event: Event }) => {
        const isSaved = savedEvents.includes(event.id);
        const hasDiscount = event.userFanScore >= 70;
        const discountPercent = hasDiscount ? Math.round(((event.userFanScore - 70) / 30) * 20) : 0;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-spotify-elevated rounded-md overflow-hidden group cursor-pointer">
                <Link href={`/live/${event.id}`}>
                    <div className="relative aspect-[3/2]">
                        <Image
                            src={event.artistImage}
                            alt={event.artistName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {hasDiscount && (
                            <div className="absolute top-2 right-2 bg-spotify-green text-black px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                {discountPercent}% off
                            </div>
                        )}
                        {user.topArtists.includes(event.artistId) && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                Top Artist
                            </div>
                        )}
                    </div>
                </Link>

                <div className="p-4">
                    <Link href={`/live/${event.id}`}>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-spotify-green transition-colors">
                            {event.artistName}
                        </h3>
                        <p className="text-sm text-spotify-gray-300 mb-3">{event.genre.join(", ")}</p>

                        <div className="space-y-2 text-sm text-spotify-gray-300">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" />
                                <span>
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" />
                                <span>
                                    {event.venueName}, {event.city}
                                </span>
                            </div>
                            {event.friendsGoing.length > 0 && (
                                <div className="flex items-center gap-1.5 text-spotify-green">
                                    <Users className="w-3 h-3" />
                                    <span>
                                        {event.friendsGoing.length} friend{event.friendsGoing.length > 1 ? "s" : ""}{" "}
                                        going
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <span className="text-[10px] text-spotify-gray-400">From</span>
                                <p className="font-bold text-sm">${event.basePrice}</p>
                            </div>
                            <div className="text-right text-[10px] text-spotify-gray-400">
                                {event.ticketsAvailable < 100 && (
                                    <span className="text-orange-500 font-semibold">
                                        Only {event.ticketsAvailable} left!
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSaveEvent(event.id);
                        }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                        <Heart
                            className={`w-3 h-3 ${isSaved ? "fill-spotify-green text-spotify-green" : "text-white"}`}
                        />
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-spotify-black text-white">
            <TopNav />

            <main className="pt-8 px-8 pb-24">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-1">Spotify Live</h1>
                    <p className="text-xs text-spotify-gray-300">
                        Discover live music events from your favorite artists
                    </p>
                </div>

                {/* Filters */}
                <div className="sticky top-14 z-40 bg-spotify-black pb-3 mb-4">
                    {/* Genre Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-3">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setActiveGenre(genre)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                    activeGenre === genre
                                        ? "bg-white text-black"
                                        : "bg-spotify-elevated text-white hover:bg-spotify-elevated-highlight"
                                }`}>
                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Additional Filters */}
                    <div className="flex gap-2 flex-wrap">
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-spotify-elevated text-white border-none cursor-pointer">
                            <option value="all">All Prices</option>
                            <option value="under-50">Under $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="over-100">Over $100</option>
                        </select>

                        <button
                            onClick={() => setShowOnlyNearby(!showOnlyNearby)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                showOnlyNearby
                                    ? "bg-white text-black"
                                    : "bg-spotify-elevated text-white hover:bg-spotify-elevated-highlight"
                            }`}>
                            Near You
                        </button>
                    </div>
                </div>

                {/* Shows You'll Love */}
                {topArtistEvents.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold mb-3">Shows You&apos;ll Love</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {topArtistEvents.slice(0, 8).map((event) => (
                                <div key={event.id} className="flex-shrink-0 w-[280px]">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Happening This Weekend */}
                {thisWeekendEvents.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold mb-3">Happening This Weekend</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {thisWeekendEvents.slice(0, 8).map((event) => (
                                <div key={event.id} className="flex-shrink-0 w-[280px]">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Popular Near You */}
                {nearbyEvents.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold mb-3">Popular Near You</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {nearbyEvents.slice(0, 8).map((event) => (
                                <div key={event.id} className="flex-shrink-0 w-[280px]">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Events */}
                <section>
                    <h2 className="text-lg font-bold mb-3">All Live Events</h2>
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg text-spotify-gray-300 mb-4">No events found matching your filters</p>
                            <button
                                onClick={() => {
                                    setActiveGenre("all");
                                    setPriceFilter("all");
                                    setShowOnlyNearby(false);
                                }}
                                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform">
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
