import React from 'react';
import {
  Zap,
  UtensilsCrossed,
  CreditCard,
  MapPin,
  Star,
  Target,
  QrCode,
} from 'lucide-react';

export default function CravoGetTheAPP() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      {/* Floating Food Emojis */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div
          className="absolute top-20 left-20 text-6xl animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        >
          🍕
        </div>
        <div
          className="absolute top-40 right-32 text-6xl animate-bounce"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        >
          🍔
        </div>
        <div
          className="absolute bottom-32 left-32 text-6xl animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '3.5s' }}
        >
          🍜
        </div>
        <div
          className="absolute bottom-48 right-20 text-6xl animate-bounce"
          style={{ animationDelay: '1.5s', animationDuration: '4s' }}
        >
          🌮
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center space-x-1 mb-4">
            <div className="w-18 h-18 rounded-xl  cursor-pointer">
              <img src="/assets/Cravo_logo.png" alt="Cravo Logo" />
            </div>
            <div className="w-32">
              <img
                src="/assets/Cravo_text_black_logo.png"
                alt="Cravo Text Logo"
                className="h-10"
              />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent leading-tight">
              Delicious Food, Delivered Fast
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Experience the best food delivery service right at your
              fingertips. Order from your favorite restaurants and enjoy quick,
              reliable delivery.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.523 15.341c-.476 2.225-2.175 4.092-4.432 4.092-1.511 0-1.997-.986-3.727-.986-1.765 0-2.357.956-3.727.986-2.291.06-4.25-2.175-4.75-4.432-.986-4.432.255-9.771 4.45-10.116 1.067-.09 2.067.61 2.732.61.665 0 1.911-.75 3.227-.64 1.316.11 2.301.75 2.953 1.881-2.633 1.441-2.201 5.197.274 6.605zm-1.273-8.836c-1.261.15-2.447-.75-2.747-1.651-.3-.901.225-1.861 1.186-2.161 1.411-.45 2.932.45 3.232 1.711.3 1.261-.72 1.951-1.671 2.101z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </button>

              <button className="group flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.921V2.735a1 1 0 0 1 .609-.921zM14.5 12.707l2.542 2.542-9.5 5.492L14.5 12.707zm0-1.414L7.542 4.258l9.5 5.493L14.5 11.293zm3.967-1.908l2.526 1.441c.576.329.576 1.158 0 1.488l-2.526 1.441-2.679-2.685 2.679-2.685z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </button>
            </div>

            {/* QR Code Section */}
            <div className="mt-12 pt-8 border-t-2 border-yellow-200">
              <div className="flex items-start gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-yellow-400">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-gray-900" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Scan to Download
                  </h3>
                  <p className="text-gray-600">
                    Scan this QR code with your phone camera to download the
                    Cravo app instantly!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup - More Realistic */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-80 h-[650px]">
                {/* Phone Body */}
                <div className="absolute inset-0 bg-gray-900 rounded-[3.5rem] shadow-2xl">
                  {/* Screen */}
                  <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-[3rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-12 bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center justify-between px-6">
                      <span className="text-xs font-semibold text-gray-900">
                        9:41
                      </span>
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-white h-full">
                      {/* App Logo and Name */}
                      <div className="text-center mb-8">
                        <div className="inline-flex flex-col items-center justify-center rounded-3xl shadow-x mb-4">
                          <div className="w-18 h-18 rounded-xl cursor-pointer">
                            <img
                              src="/assets/Cravo_logo.png"
                              alt="Cravo Logo"
                            />
                          </div>
                        </div>
                        <div className="w-32">
                          <img
                            src="/assets/Cravo_text_black_logo.png"
                            alt="Cravo Text Logo"
                            className="h-10"
                          />
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          Food Delivery App
                        </p>
                      </div>

                      {/* Mock UI Elements */}
                      <div className="space-y-4 mt-8">
                        {/* Search Bar */}
                        <div className="bg-white rounded-2xl p-4 shadow-md border border-yellow-200">
                          <div className="h-3 bg-gray-200 rounded-full w-32"></div>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-3 overflow-hidden">
                          <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl shadow-md"></div>
                          <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl shadow-md border border-yellow-200"></div>
                          <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl shadow-md border border-yellow-200"></div>
                        </div>

                        {/* Food Cards */}
                        <div className="space-y-3">
                          <div className="bg-white rounded-2xl p-4 shadow-md border border-yellow-200">
                            <div className="flex gap-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-xl flex-shrink-0"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                                <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl p-4 shadow-md border border-yellow-200">
                            <div className="flex gap-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-xl flex-shrink-0"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                                <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-900 rounded-b-3xl"></div>
                </div>

                {/* Side Buttons */}
                <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l"></div>
                <div className="absolute right-0 top-52 w-1 h-12 bg-gray-800 rounded-l"></div>
                <div className="absolute right-0 top-68 w-1 h-12 bg-gray-800 rounded-l"></div>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400 rounded-full opacity-20 animate-ping"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent mb-16">
            Why Choose Cravo?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Lightning Fast Delivery
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Get your food delivered hot and fresh in record time with our
                efficient delivery network.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Wide Restaurant Selection
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Choose from thousands of restaurants offering cuisines from
                around the world.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Secure Payments
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Multiple payment options with bank-level security to keep your
                transactions safe.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-Time Tracking
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Track your order in real-time and know exactly when it will
                arrive at your door.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Exclusive Deals
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Enjoy special discounts and offers available only on the Cravo
                app.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Simple, intuitive interface that makes ordering food a
                delightful experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
