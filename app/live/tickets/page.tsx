'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { TopNav } from '@/components/TopNav'
import { Button } from '@/components'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, QrCode, Download, Share2, Navigation, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import QRCodeSVG from 'react-qr-code'

export default function TicketsPage() {
  const { purchasedTickets, events } = useApp()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  const ticketsWithEvents = purchasedTickets.map(ticket => ({
    ...ticket,
    event: events.find(e => e.id === ticket.eventId)
  })).filter(t => t.event)

  const now = new Date()
  const upcomingTickets = ticketsWithEvents.filter(t => new Date(t.event!.date) >= now)
  const pastTickets = ticketsWithEvents.filter(t => new Date(t.event!.date) < now)

  const activeTickets = activeTab === 'upcoming' ? upcomingTickets : pastTickets

  if (purchasedTickets.length === 0) {
    return (
      <div className="min-h-screen bg-spotify-black text-white">
        <TopNav />
        
        <main className="pt-14 px-6 pb-16">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-spotify-elevated rounded-full flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-10 h-10 text-spotify-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">No Tickets Yet</h1>
            <p className="text-base text-spotify-gray-300 mb-6">
              Start exploring live events and book your first concert!
            </p>
            <Link href="/live">
              <Button className="bg-spotify-green text-black hover:bg-spotify-green-bright font-bold text-sm px-6 py-2 rounded-full">
                Browse Live Events
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const selectedTicket = selectedTicketId 
    ? ticketsWithEvents.find(t => t.id === selectedTicketId)
    : null

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <TopNav />
      
      <main className="pt-14 px-6 pb-16 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Tickets</h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 border-b border-spotify-elevated">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 px-2 text-sm font-semibold transition-colors ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-spotify-green text-white'
                : 'text-spotify-gray-400 hover:text-white'
            }`}
          >
            Upcoming ({upcomingTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 px-2 text-sm font-semibold transition-colors ${
              activeTab === 'past'
                ? 'border-b-2 border-spotify-green text-white'
                : 'text-spotify-gray-400 hover:text-white'
            }`}
          >
            Past ({pastTickets.length})
          </button>
        </div>

        {activeTickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-base text-spotify-gray-300 mb-4">
              {activeTab === 'upcoming' ? 'No upcoming events' : 'No past events'}
            </p>
            <Link href="/live">
              <Button variant="secondary">
                Browse Events
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTickets.map((ticket) => {
              const event = ticket.event!
              const eventDate = new Date(event.date)
              const isPast = eventDate < now

              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-spotify-elevated rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image */}
                    <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                      <Image
                        src={event.artistImage}
                        alt={event.artistName}
                        fill
                        className="object-cover"
                      />
                      {isPast && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-spotify-gray-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            Past Event
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold mb-1.5">{event.artistName}</h3>
                          <div className="space-y-1.5 text-spotify-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {eventDate.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })} at {event.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.venueName}, {event.city}</span>
                            </div>
                          </div>
                        </div>

                        {!isPast && (
                          <button
                            onClick={() => setSelectedTicketId(selectedTicketId === ticket.id ? null : ticket.id)}
                            className="flex items-center gap-1.5 bg-spotify-green text-black px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-spotify-green-bright transition-colors"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            {selectedTicketId === ticket.id ? 'Hide' : 'Show'} QR
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="bg-spotify-black rounded-lg px-3 py-1.5">
                          <span className="text-[10px] text-spotify-gray-400">Quantity</span>
                          <p className="font-bold text-sm">{ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}</p>
                        </div>
                        <div className="bg-spotify-black rounded-lg px-3 py-1.5">
                          <span className="text-[10px] text-spotify-gray-400">Section</span>
                          <p className="font-bold text-sm">{ticket.section}</p>
                        </div>
                        <div className="bg-spotify-black rounded-lg px-3 py-1.5">
                          <span className="text-[10px] text-spotify-gray-400">Total Paid</span>
                          <p className="font-bold text-sm">${ticket.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>

                      {!isPast && (
                        <div className="flex flex-wrap gap-3">
                          <Button variant="secondary" size="sm" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                          <Button variant="secondary" size="sm" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                          <Button variant="secondary" size="sm" className="flex items-center gap-2">
                            <Navigation className="w-4 h-4" />
                            Get Directions
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* QR Code Section */}
                  {selectedTicketId === ticket.id && !isPast && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-spotify-elevated-highlight p-4 bg-spotify-black"
                    >
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="bg-white p-4 rounded-lg">
                          <QRCodeSVG value={ticket.qrCode} size={140} level="H" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold mb-2">Entry QR Code</h4>
                          <p className="text-sm text-spotify-gray-300 mb-3">
                            Show this QR code at the venue entrance for quick check-in. Make sure your phone brightness is turned up!
                          </p>
                          <div className="bg-spotify-elevated rounded-lg p-4">
                            <p className="text-sm text-spotify-gray-400 mb-2">Ticket ID</p>
                            <code className="font-mono text-sm">{ticket.qrCode}</code>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* CTA to Browse More */}
        {activeTab === 'upcoming' && upcomingTickets.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Looking for More Live Music?</h3>
            <p className="text-sm text-white/90 mb-4">
              Discover upcoming shows from your favorite artists and new discoveries
            </p>
            <Link href="/live">
              <Button className="bg-white text-black hover:bg-gray-100 font-bold text-sm px-6 py-2 rounded-full">
                Browse Live Events
                <ChevronRight className="w-4 h-4 ml-1.5 inline" />
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
