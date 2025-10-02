import React from 'react';
import { Star, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestDineOutSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-yellow-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-yellow-200">
              <Sparkles className="w-4 h-4" />
              Premium Selection
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Unforgettable
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
                Dining Experiences
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Discover handpicked restaurants that redefine fine dining with
              exceptional ambiance, world-class cuisine, and memories that last
              forever.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-2 pt-2">
              <div className="group cursor-pointer flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">
                    Top Rated Venues
                  </p>
                  <p className="text-sm text-gray-600">
                    Curated selection of 4.5+ star restaurants
                  </p>
                </div>
              </div>

              <div className=" cursor-pointer group flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">
                    Prime Locations
                  </p>
                  <p className="text-sm text-gray-600">
                    Best dining spots across the city
                  </p>
                </div>
              </div>

              <div className=" cursor-pointer group flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">
                    Instant Reservation
                  </p>
                  <p className="text-sm text-gray-600">
                    Book your perfect table in seconds
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link to={'restaurants/dine-out'}>
              <button className="cursor-pointer group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-200 hover:shadow-xl hover:shadow-yellow-300 flex items-center gap-3 hover:gap-4">
                Explore Dine-Out Options
                <ArrowRight className="w-5 h-5 transition-all" />
              </button>
            </Link>
          </div>

          {/* Image Side */}
          <div className="relative">
            {/* Background Accent */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Best Restaurant for Dine-Out"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">4.8</p>
                  <p className="text-xs text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Small Accent Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <p className="text-xs font-semibold text-gray-600">FEATURED</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestDineOutSection;
