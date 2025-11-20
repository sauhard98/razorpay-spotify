"use client";

import { useApp } from "@/lib/context";
import { TopNav } from "@/components/TopNav";
import { EventDiscoveryModal, MediaCard } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

export default function Home() {
    const { mockPlaylists, mockCurrentPlaying } = useApp();

    return (
        <div className="min-h-screen bg-spotify-black text-white">
            <TopNav />
            <EventDiscoveryModal />

            <main className="pt-8 px-6 pb-16">
                {/* Continue Playing */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Continue Playing</h2>
                    <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg p-6 flex items-center gap-6 group hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-800 transition-all cursor-pointer">
                        <Image
                            src={mockCurrentPlaying.imageUrl}
                            alt={mockCurrentPlaying.song}
                            width={96}
                            height={96}
                            className="rounded shadow-xl"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{mockCurrentPlaying.song}</h3>
                            <p className="text-sm text-white/80">{mockCurrentPlaying.artist}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{
                                            width: `${
                                                (mockCurrentPlaying.progress / mockCurrentPlaying.duration) * 100
                                            }%`,
                                        }}
                                    />
                                </div>
                                <span className="text-xs text-white/60">
                                    {Math.floor(mockCurrentPlaying.progress / 60)}:
                                    {(mockCurrentPlaying.progress % 60).toString().padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                        <button className="w-14 h-14 rounded-full bg-spotify-green flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Play className="w-6 h-6 text-black fill-black ml-1" />
                        </button>
                    </div>
                </section>

                {/* Playlists */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Your Playlists</h2>
                        <Link
                            href="/collection/playlists"
                            className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
                            Show all
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {mockPlaylists.map((playlist) => (
                            <MediaCard
                                key={playlist.id}
                                title={playlist.name}
                                subtitle={playlist.description}
                                imageUrl={playlist.imageUrl}
                            />
                        ))}
                    </div>
                </section>

                {/* Pre-save Upcoming Releases */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Pre-save Upcoming Releases</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        <MediaCard
                            title="Midnights (3am Edition)"
                            subtitle="Taylor Swift • Mar 15"
                            imageUrl="https://i.scdn.co/image/ab67616d0000b2732f9cb9f5c0e8e1e5d7d7b5c6"
                        />
                        <MediaCard
                            title="Did you know that there's a tunnel"
                            subtitle="The 1975 • Mar 22"
                            imageUrl="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b"
                        />
                        <MediaCard
                            title="Hit Me Hard and Soft"
                            subtitle="Billie Eilish • Apr 5"
                            imageUrl="https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a"
                        />
                    </div>
                </section>

                {/* Spotify Live CTA */}
                <section className="mb-8">
                    <Link href="/live">
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 group cursor-pointer hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200')] bg-cover bg-center opacity-20"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full mb-3">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-semibold">LIVE</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">See Your Favorite Artists Live</h2>
                                <p className="text-sm text-white/90 mb-4 max-w-2xl">
                                    Get tickets to concerts from artists you love. Exclusive fan discounts, friends
                                    tracking, and seamless checkout.
                                </p>
                                <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                                    Explore Live Events
                                </button>
                            </div>
                        </div>
                    </Link>
                </section>
            </main>
        </div>
    );
}
