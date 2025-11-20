"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { useToast } from "@/components/ToastProvider";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Heart,
    Share2,
    ChevronLeft,
    Music,
    Info,
    Image as ImageIcon,
    History,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EventDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const { events, user, savedEvents, toggleSaveEvent, addToCart } = useApp();
    const { showToast } = useToast();

    const [activeTab, setActiveTab] = useState<"overview" | "setlist" | "venue" | "past">("overview");
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const event = events.find((e) => e.id === id);

    if (!event) {
        return (
            <div className="min-h-screen bg-spotify-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <Link href="/live">
                        <Button>Back to Live Events</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isSaved = savedEvents.includes(event.id);
    const hasDiscount = event.userFanScore >= 70;
    const discountPercent = hasDiscount ? Math.round(((event.userFanScore - 70) / 30) * 20) : 0;
    const discountedPrice = hasDiscount ? event.basePrice * (1 - discountPercent / 100) : event.basePrice;
    const isTopArtist = user.topArtists.includes(event.artistId);

    const handleAddToCart = () => {
        addToCart({
            eventId: event.id,
            quantity: selectedQuantity,
            selectedSeats: [],
            pricePerTicket: discountedPrice,
            section: "General Admission",
        });
        showToast("success", "Added to cart!");
    };

    const handleBuyNow = () => {
        addToCart({
            eventId: event.id,
            quantity: selectedQuantity,
            selectedSeats: [],
            pricePerTicket: discountedPrice,
            section: "General Admission",
        });
        router.push("/live/checkout");
    };

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-spotify-black text-white">
            <TopNav />

            <main className="pt-8">
                {/* Hero Section */}
                <div className="relative h-[40vh] overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image src={event.artistImage} alt={event.artistName} fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-spotify-black via-spotify-black/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end px-6 pb-6">
                        <button
                            onClick={() => router.back()}
                            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-end gap-4">
                            <Image
                                src={event.artistImage}
                                alt={event.artistName}
                                width={120}
                                height={120}
                                className="rounded-md shadow-2xl"
                            />

                            <div className="flex-1 pb-2">
                                {isTopArtist && (
                                    <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded-full text-xs font-bold mb-2">
                                        ⭐ Top Artist
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold mb-3">{event.artistName}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-white/80 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        <span>
                                            {event.venueName}, {event.city}
                                        </span>
                                    </div>
                                </div>
                                {event.friendsGoing.length > 0 && (
                                    <div className="flex items-center gap-2 text-spotify-green mb-4">
                                        <Users className="w-5 h-5" />
                                        <span className="font-semibold">
                                            {event.friendsGoing.join(", ")}{" "}
                                            {event.friendsGoing.length === 1 ? "is" : "are"} going
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleSaveEvent(event.id)}
                                        className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <Heart
                                            className={`w-4 h-4 ${
                                                isSaved ? "fill-spotify-green text-spotify-green" : "text-white"
                                            }`}
                                        />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="sticky top-12 z-30 bg-spotify-black border-b border-spotify-elevated px-6">
                    <div className="flex gap-4">
                        {[
                            { id: "overview", label: "Overview", icon: Info },
                            { id: "setlist", label: "Setlist Preview", icon: Music },
                            { id: "venue", label: "Venue Info", icon: MapPin },
                            { id: "past", label: "Past Shows", icon: History },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`flex items-center gap-1.5 py-3 px-2 border-b-2 transition-colors text-sm ${
                                    activeTab === tab.id
                                        ? "border-spotify-green text-white"
                                        : "border-transparent text-spotify-gray-300 hover:text-white"
                                }`}>
                                <tab.icon className="w-3.5 h-3.5" />
                                <span className="font-semibold">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === "overview" && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                                    <p className="text-spotify-gray-300 leading-relaxed">{event.about}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-3">Event Details</h3>
                                    <div className="grid grid-cols-2 gap-4 text-spotify-gray-300">
                                        <div>
                                            <span className="text-sm text-spotify-gray-400">Genre</span>
                                            <p className="font-semibold text-white">{event.genre.join(", ")}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-spotify-gray-400">Duration</span>
                                            <p className="font-semibold text-white">{event.expectedDuration}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-spotify-gray-400">Age Restriction</span>
                                            <p className="font-semibold text-white">{event.ageRestriction}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-spotify-gray-400">Venue Capacity</span>
                                            <p className="font-semibold text-white">
                                                {event.venueCapacity.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {event.isTrending && (
                                    <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">🔥</span>
                                            <h3 className="font-bold text-lg">Trending Event</h3>
                                        </div>
                                        <p className="text-sm text-spotify-gray-300">
                                            This show is selling fast! {Math.round(event.fillRate)}% of tickets are
                                            already sold.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "setlist" && (
                            <motion.div key="setlist" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-2xl font-bold mb-4">Expected Setlist</h2>
                                <p className="text-spotify-gray-300 mb-6 text-sm">
                                    Based on recent performances. Subject to change.
                                </p>
                                <div className="space-y-2">
                                    {event.setlistPreview.map((song, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-spotify-elevated transition-colors">
                                            <span className="text-spotify-gray-400 font-mono text-sm w-6">
                                                {index + 1}
                                            </span>
                                            <Music className="w-4 h-4 text-spotify-gray-400" />
                                            <span className="flex-1">{song}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "venue" && (
                            <motion.div key="venue" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-2xl font-bold mb-4">{event.venueName}</h2>
                                <div className="space-y-4 text-spotify-gray-300">
                                    <div>
                                        <span className="text-sm text-spotify-gray-400">Location</span>
                                        <p className="font-semibold text-white">
                                            {event.city}, {event.state}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-spotify-gray-400">Capacity</span>
                                        <p className="font-semibold text-white">
                                            {event.venueCapacity.toLocaleString()} people
                                        </p>
                                    </div>
                                    <div className="aspect-video bg-spotify-elevated rounded-lg overflow-hidden">
                                        <iframe
                                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9!2d-73.98!3d40.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzI0LjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890`}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "past" && (
                            <motion.div key="past" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-lg font-bold mb-3">Past Show Photos</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {event.previousShowImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="aspect-video relative rounded-lg overflow-hidden group">
                                            <Image
                                                src={img}
                                                alt={`Past show ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar - Ticket Purchase */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-spotify-elevated rounded-lg p-3">
                            <h3 className="text-base font-bold mb-2">Get Tickets</h3>{" "}
                            {hasDiscount && (
                                <div className="bg-gradient-to-r from-spotify-green/20 to-green-600/20 border border-spotify-green/30 rounded-lg p-2 mb-3">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="text-sm">✨</span>
                                        <span className="font-bold text-spotify-green text-xs">
                                            Fan Discount: {discountPercent}% OFF
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-spotify-gray-300">
                                        You&apos;re a top fan! Enjoy exclusive pricing.
                                    </p>
                                </div>
                            )}
                            <div className="mb-4">
                                <div className="flex items-baseline gap-1.5 mb-1">
                                    {hasDiscount && (
                                        <span className="text-lg text-spotify-gray-400 line-through">
                                            ${event.basePrice}
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-white">${discountedPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-spotify-gray-400">per ticket</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold mb-1.5">Quantity</label>
                                <select
                                    value={selectedQuantity}
                                    onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                                    className="w-full px-3 py-2 text-sm bg-spotify-black rounded-lg border border-spotify-elevated-highlight focus:border-white focus:outline-none">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? "ticket" : "tickets"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 pb-4 border-b border-spotify-elevated-highlight">
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-spotify-gray-400">Subtotal</span>
                                    <span className="font-semibold">
                                        ${(discountedPrice * selectedQuantity).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-spotify-gray-400">Service Fee</span>
                                    <span className="font-semibold">$5.00</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold mt-2">
                                    <span>Total</span>
                                    <span>${(discountedPrice * selectedQuantity + 5).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Button
                                    onClick={handleBuyNow}
                                    size="sm"
                                    className="w-full bg-spotify-green text-black hover:bg-spotify-green-bright font-bold py-1.5 text-xs rounded-full">
                                    Buy Now
                                </Button>
                                <Button
                                    onClick={handleAddToCart}
                                    variant="secondary"
                                    size="sm"
                                    className="w-full py-1.5 text-xs rounded-full">
                                    Add to Cart
                                </Button>
                            </div>
                            {event.ticketsAvailable < 100 && (
                                <p className="text-center text-xs text-orange-500 font-semibold mt-3">
                                    ⚠️ Only {event.ticketsAvailable} tickets remaining!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
