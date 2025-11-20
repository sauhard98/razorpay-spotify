'use client'

import { useEffect, useState } from 'react'
import { useApp } from '@/lib/context'
import { TopNav } from '@/components/TopNav'
import { Button } from '@/components'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Download, Share2, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import QRCodeSVG from 'react-qr-code'
import { useRouter } from 'next/navigation'

export default function ConfirmationPage() {
  const router = useRouter()
  const { purchasedTickets, events } = useApp()
  const [showConfetti, setShowConfetti] = useState(true)

  // Get the most recent ticket (last purchase)
  const latestTicket = purchasedTickets[purchasedTickets.length - 1]

  useEffect(() => {
    if (!latestTicket) {
      router.push('/live')
      return
    }

    // Trigger confetti animation
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#1DB954', '#ffffff', '#535353'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#1DB954', '#ffffff', '#535353'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      } else {
        setShowConfetti(false)
      }
    }

    frame()
  }, [latestTicket, router])

  if (!latestTicket) {
    return null
  }

  const event = events.find(e => e.id === latestTicket.eventId)
  
  if (!event) {
    return null
  }

  const eventDate = new Date(event.date)

  const relatedEvents = events
    .filter(e => 
      e.id !== event.id && 
      e.genre.some(g => event.genre.includes(g)) &&
      new Date(e.date) > new Date()
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <TopNav />
      
      <main className="pt-14 px-8 pb-24 max-w-4xl mx-auto">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-spotify-green rounded-full mb-4"
          >
            <CheckCircle className="w-10 h-10 text-black" />
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-3">You&apos;re Going!</h1>
          <p className="text-base text-spotify-gray-300">
            Your tickets have been confirmed. Check your email for details.
          </p>
        </motion.div>

        {/* Event Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-spotify-elevated rounded-lg overflow-hidden mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 p-4">
            <Image
              src={event.artistImage}
              alt={event.artistName}
              width={120}
              height={120}
              className="rounded-lg"
            />
            
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-3">{event.artistName}</h2>
              
              <div className="space-y-2 text-spotify-gray-300 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venueName}, {event.city}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-spotify-black rounded-lg px-3 py-2">
                <span className="text-xs text-spotify-gray-400">Tickets:</span>
                <span className="font-bold text-sm">{latestTicket.quantity}x {latestTicket.section}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-spotify-elevated rounded-lg p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-center mb-4">Your Ticket QR Code</h3>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG 
                value={latestTicket.qrCode} 
                size={160}
                level="H"
              />
            </div>
          </div>

          <p className="text-center text-sm text-spotify-gray-400 mb-6">
            Show this QR code at the venue entrance. You can also find it in the Tickets section.
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="secondary" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Ticket
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* What's Next Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-spotify-elevated rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-bold mb-4">What&apos;s Next?</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-spotify-green text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-0.5">Check Your Email</h4>
                <p className="text-xs text-spotify-gray-400">
                  We&apos;ve sent your tickets and event details to {latestTicket.id.includes('@') ? latestTicket.id : 'your email'}.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-spotify-elevated-highlight text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-0.5">Save the Date</h4>
                <p className="text-xs text-spotify-gray-400">
                  Add the event to your calendar so you don&apos;t miss it!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-spotify-elevated-highlight text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-0.5">Plan Your Trip</h4>
                <p className="text-xs text-spotify-gray-400">
                  Check venue details, parking information, and nearby accommodations.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-spotify-elevated-highlight text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-0.5">Enjoy the Show!</h4>
                <p className="text-xs text-spotify-gray-400">
                  Arrive early, show your QR code at the entrance, and have an amazing time!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {relatedEvents.map(relatedEvent => (
                <Link key={relatedEvent.id} href={`/live/${relatedEvent.id}`}>
                  <div className="bg-spotify-elevated rounded-lg overflow-hidden hover:bg-spotify-elevated-highlight transition-colors group">
                    <div className="relative aspect-square">
                      <Image
                        src={relatedEvent.artistImage}
                        alt={relatedEvent.artistName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-1">{relatedEvent.artistName}</h4>
                      <p className="text-sm text-spotify-gray-400">
                        {new Date(relatedEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/live/tickets" className="flex-1">
            <Button className="w-full bg-spotify-green text-black hover:bg-spotify-green-bright font-bold py-3 rounded-full">
              View All My Tickets
            </Button>
          </Link>
          <Link href="/live" className="flex-1">
            <Button variant="secondary" className="w-full py-3 rounded-full">
              Browse More Events
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
