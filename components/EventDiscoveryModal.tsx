"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { useApp } from "@/lib/context";
import { Button } from "./Button";
import Image from "next/image";

export function EventDiscoveryModal() {
    const router = useRouter();
    const { showModal, dismissModal, events, user } = useApp();
    const [dontShowAgain, setDontShowAgain] = useState(false);

    // Find the best event to promote
    const promotedEvent = events.find((event) => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const daysUntil = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        return (
            user.topArtists.includes(event.artistId) &&
            event.isNearby &&
            daysUntil > 0 &&
            daysUntil < 60 &&
            event.ticketsAvailable > 0
        );
    });

    if (!showModal || !promotedEvent) return null;

    const handleGetTickets = () => {
        dismissModal(dontShowAgain);
        router.push(`/live?artist=${promotedEvent.artistId}`);
    };

    const handleMaybeLater = () => {
        dismissModal(dontShowAgain);
    };

    const discount = Math.round((promotedEvent.userFanScore / 100) * 30);
    const eventDate = new Date(promotedEvent.date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const distance = Math.floor(Math.random() * 30) + 5;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                onClick={handleMaybeLater}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                {/* Modal Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="relative w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Close Button */}
                    <button
                        onClick={handleMaybeLater}
                        className="absolute -top-2 -right-2 z-10 p-2 bg-black/90 rounded-full text-white hover:scale-110 transition-transform">
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative bg-spotify-black rounded-xl overflow-hidden shadow-2xl border border-spotify-elevated">
                        {/* Artist Image Background with Gradient */}
                        <div className="relative h-32 overflow-hidden">
                            <Image
                                src={promotedEvent.artistImage}
                                alt={promotedEvent.artistName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                            {/* Top Fan Badge */}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-spotify-green/90 backdrop-blur-sm rounded-full">
                                <span className="text-xs font-bold text-black">
                                    ⭐ Top {Math.min(5, Math.floor(100 - promotedEvent.userFanScore))}% Listener
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">
                                    🎤 See {promotedEvent.artistName} Live!
                                </h2>
                                <p className="text-spotify-gray-300 text-xs">
                                    {promotedEvent.artistName} is performing in {promotedEvent.city} on {formattedDate}
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-spotify-green">✨</span>
                                    <span className="text-white">Get {discount}% off tickets as a top listener</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-spotify-green" />
                                    <span className="text-white">{distance} miles away</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-spotify-green">🎟️</span>
                                    <span className="text-white">
                                        Only {promotedEvent.ticketsAvailable} tickets left
                                    </span>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-2 pt-1">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleGetTickets}
                                    className="w-full text-sm py-2">
                                    Get Tickets
                                </Button>
                                <button
                                    onClick={handleMaybeLater}
                                    className="w-full py-1.5 text-xs text-spotify-gray-300 hover:text-white transition-colors">
                                    Maybe Later
                                </button>
                            </div>

                            {/* Don't Show Again */}
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="dont-show"
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                    className="w-4 h-4 rounded border-spotify-gray-400 bg-transparent checked:bg-spotify-green cursor-pointer"
                                />
                                <label htmlFor="dont-show" className="text-xs text-spotify-gray-400 cursor-pointer">
                                    Don&apos;t show me this again
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
