import { Award, Gift, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoyaltyProgram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Loyalty Program</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Earn rewards every time you stay at Orbi City Batumi
          </p>
        </div>
      </header>

      {/* Benefits Overview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Exclusive Benefits for Our Loyal Guests</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join our loyalty program and enjoy special perks, discounts, and rewards with every stay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn Points</h3>
              <p className="text-slate-600">
                Earn 10 points for every dollar spent on accommodations
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Discounts</h3>
              <p className="text-slate-600">
                Get up to 15% off on future bookings as a loyalty member
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Priority Upgrades</h3>
              <p className="text-slate-600">
                Complimentary room upgrades subject to availability
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Special Perks</h3>
              <p className="text-slate-600">
                Early check-in, late check-out, and welcome amenities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-lg text-slate-600">
              Progress through our tiers and unlock even more benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver Tier */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-slate-300">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-slate-200 rounded-full text-slate-700 font-semibold mb-4">
                  Silver
                </div>
                <h3 className="text-2xl font-bold mb-2">0-999 Points</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>5% discount on bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Welcome drink on arrival</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Birthday special offer</span>
                </li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-xl border-2 border-yellow-400 transform scale-105">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-yellow-400 rounded-full text-yellow-900 font-semibold mb-4">
                  Gold
                </div>
                <h3 className="text-2xl font-bold mb-2">1,000-2,999 Points</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span>10% discount on bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span>All Silver benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span>Room upgrade (subject to availability)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span>Late check-out until 2 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">✓</span>
                  <span>Complimentary breakfast</span>
                </li>
              </ul>
            </div>

            {/* Platinum Tier */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-8 rounded-xl shadow-xl border-2 border-slate-500">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-slate-400 rounded-full text-slate-900 font-semibold mb-4">
                  Platinum
                </div>
                <h3 className="text-2xl font-bold mb-2">3,000+ Points</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>15% discount on bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>All Gold benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>Guaranteed room upgrade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>Late check-out until 4 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>Exclusive VIP amenities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-300 mt-1">✓</span>
                  <span>Personal concierge service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Sign Up</h3>
                  <p className="text-slate-600">
                    Create your free loyalty account when you make your first booking or contact us to join
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Earn Points</h3>
                  <p className="text-slate-600">
                    Earn 10 points for every $1 spent on accommodations. Points are automatically added to your account
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Redeem Rewards</h3>
                  <p className="text-slate-600">
                    Use your points for free nights, upgrades, or special services. 1,000 points = $100 value
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Enjoy Benefits</h3>
                  <p className="text-slate-600">
                    Access tier-based benefits automatically on every stay. The more you stay, the more you save
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Earning Rewards?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our loyalty program today and start enjoying exclusive benefits on your next stay
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50">
              Join Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
