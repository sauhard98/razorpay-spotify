'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/context'
import { useToast } from '@/components/ToastProvider'
import { TopNav } from '@/components/TopNav'
import { Button, Input } from '@/components'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ShoppingCart, Shield, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, events, user, clearCart, addPurchasedTicket } = useApp()
  const { showToast } = useToast()
  
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1] || '',
    phone: '',
  })

  const [addPremium, setAddPremium] = useState(false)

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/live')
    }
  }, [cart, router])

  if (cart.length === 0) {
    return null
  }

  const cartWithEvents = cart.map(item => ({
    ...item,
    event: events.find(e => e.id === item.eventId)!
  }))

  const subtotal = cartWithEvents.reduce((sum, item) => sum + (item.pricePerTicket * item.quantity), 0)
  const serviceFee = 5
  const premiumFee = addPremium ? 5 : 0
  const total = subtotal + (addPremium ? premiumFee : serviceFee)

  const handlePayment = async () => {
    if (!formData.email || !formData.firstName || !formData.phone) {
      showToast('error', 'Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    
    // Simulate Razorpay payment
    setTimeout(() => {
      cartWithEvents.forEach(item => {
        addPurchasedTicket({
          id: `ticket-${Date.now()}-${Math.random()}`,
          eventId: item.eventId,
          quantity: item.quantity,
          totalPrice: item.pricePerTicket * item.quantity,
          purchaseDate: new Date().toISOString(),
          qrCode: `QR-${item.eventId}-${Date.now()}`,
          section: item.section,
          row: 'A',
          seats: item.selectedSeats,
          status: 'upcoming',
        })
      })
      
      clearCart()
      router.push('/live/confirmation')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <TopNav />
      
      <main className="pt-14 px-4 sm:px-6 pb-16 max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Spotify Premium Upsell */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <button
                onClick={() => setAddPremium(!addPremium)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  addPremium 
                    ? 'border-spotify-green bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    addPremium ? 'bg-spotify-green border-spotify-green' : 'border-gray-300'
                  }`}>
                    {addPremium && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">Spotify Premium</h4>
                      <span className="font-bold text-gray-900">${premiumFee}.00/mo</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Ad-free music, offline listening & early ticket access
                    </p>
                    {addPremium && (
                      <p className="text-xs text-spotify-green font-medium mt-2">
                        ✓ Service fee waived with Premium
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* Razorpay Info */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm mb-1">Powered by Razorpay</h3>
                  <p className="text-xs text-blue-100">
                    Your payment information is encrypted and secure. This is a sandbox environment for testing.
                  </p>
                </div>
              </div>
              <div className="text-xs text-blue-100 space-y-1 pl-8">
                <p>• Test Card: 4111 1111 1111 1111</p>
                <p>• Any future CVV and expiry date</p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {cartWithEvents.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={item.event.artistImage}
                      alt={item.event.artistName}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">{item.event.artistName}</h4>
                      <p className="text-xs text-gray-500">{new Date(item.event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{item.quantity}x ${item.pricePerTicket.toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-sm text-gray-900">${(item.pricePerTicket * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {addPremium ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 line-through">Service Fee</span>
                      <span className="text-gray-400 line-through">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Spotify Premium (1st month)</span>
                      <span className="font-semibold text-gray-900">${premiumFee.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold text-gray-900">${serviceFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-bold mb-6">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay ${total.toFixed(2)}</>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By completing this purchase, you agree to the Terms of Service
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
