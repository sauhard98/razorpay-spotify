'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/context'
import { useToast } from '@/components/ToastProvider'
import { TopNav } from '@/components/TopNav'
import { Button, Input } from '@/components'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CreditCard, Lock, ChevronLeft, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, events, user, clearCart, addPurchasedTicket } = useApp()
  const { showToast } = useToast()
  
  const [step, setStep] = useState<'info' | 'payment'>('info')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1] || '',
    phone: '',
  })

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
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
  const premiumFee = addPremium ? 5 : 0
  const promoDiscount = (subtotal * discount) / 100
  const total = subtotal + premiumFee - promoDiscount

  const handleApplyPromo = () => {
    const validPromos: Record<string, number> = {
      'SPOTIFY10': 10,
      'LIVE20': 20,
      'FIRSTTIME': 15,
    }
    
    const code = promoCode.toUpperCase()
    if (validPromos[code]) {
      setDiscount(validPromos[code])
      showToast('success', `Promo code applied! ${validPromos[code]}% off`)
    } else {
      showToast('error', 'Invalid promo code')
    }
  }

  const handleContinue = () => {
    if (!formData.email || !formData.firstName || !formData.phone) {
      showToast('error', 'Please fill in all required fields')
      return
    }
    setStep('payment')
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate Razorpay payment (in real app, integrate Razorpay SDK)
    setTimeout(() => {
      // Generate mock tickets
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
    <div className="min-h-screen bg-spotify-black text-white">
      <TopNav />
      
      <main className="pt-14 px-6 pb-16 max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-spotify-gray-300 hover:text-white mb-4 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === 'info' ? 'bg-spotify-green text-black' : 'bg-spotify-green text-black'
            }`}>
              1
            </div>
            <span className={`text-sm ${step === 'info' ? 'font-semibold' : 'text-spotify-gray-400'}`}>Contact Info</span>
          </div>
          <div className="flex-1 h-0.5 bg-spotify-elevated" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === 'payment' ? 'bg-spotify-green text-black' : 'bg-spotify-elevated text-white'
            }`}>
              2
            </div>
            <span className={`text-sm ${step === 'payment' ? 'font-semibold' : 'text-spotify-gray-400'}`}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'info' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-spotify-elevated rounded-lg p-4">
                  <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-spotify-green text-black hover:bg-spotify-green-bright font-bold py-2.5 text-sm rounded-full"
                >
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-spotify-elevated rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Payment Method</h2>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold">RAZORPAY SANDBOX MODE</span>
                      <Lock className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-white/80 mb-4">
                      This is a demo. In production, you would enter real payment details via Razorpay.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>• Test cards: 4111 1111 1111 1111</p>
                      <p>• Any future CVV and expiry date</p>
                      <p>• Use any name</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-spotify-gray-400 mb-6">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-spotify-green text-black hover:bg-spotify-green-bright font-bold py-2.5 text-sm rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>

                <button
                  onClick={() => setStep('info')}
                  className="w-full text-spotify-gray-400 hover:text-white py-2 text-sm transition-colors"
                >
                  Back to Contact Info
                </button>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-spotify-elevated rounded-lg p-4">
              <div className="flex items-center gap-1.5 mb-4">
                <ShoppingCart className="w-4 h-4" />
                <h3 className="text-base font-bold">Order Summary</h3>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-spotify-elevated-highlight">
                {cartWithEvents.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Image
                      src={item.event.artistImage}
                      alt={item.event.artistName}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.event.artistName}</h4>
                      <p className="text-xs text-spotify-gray-400">{new Date(item.event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-spotify-gray-400">{item.quantity}x ${item.pricePerTicket.toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-sm">${(item.pricePerTicket * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Spotify Premium Upsell */}
              <div className="mb-4 pb-4 border-b border-spotify-elevated-highlight">
                <button
                  onClick={() => setAddPremium(!addPremium)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    addPremium 
                      ? 'border-spotify-green bg-spotify-green/10' 
                      : 'border-spotify-elevated-highlight bg-spotify-elevated hover:bg-spotify-elevated-highlight'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      addPremium ? 'bg-spotify-green border-spotify-green' : 'border-spotify-gray-400'
                    }`}>
                      {addPremium && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-sm">Add Spotify Premium</h4>
                        <span className="font-bold text-sm">$5.00/mo</span>
                      </div>
                      <p className="text-xs text-spotify-gray-400">
                        Get ad-free music, offline listening, and exclusive early access to concert tickets
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Promo Code */}
              <div className="mb-4 pb-4 border-b border-spotify-elevated-highlight">
                <label className="block text-xs font-semibold mb-1.5">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="secondary"
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-spotify-green mt-2">✓ {discount}% discount applied</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-spotify-gray-400">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {addPremium && (
                  <div className="flex justify-between text-xs">
                    <span className="text-spotify-gray-400">Spotify Premium (1st month)</span>
                    <span className="font-semibold">${premiumFee.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-spotify-green">Promo Discount</span>
                    <span className="font-semibold text-spotify-green">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-spotify-elevated-highlight">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
