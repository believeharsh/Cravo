import React from 'react';

const DeliveryLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Animation Container */}
        <div className="relative w-80 h-40 mx-auto mb-8">
          {/* Road */}
          <div className="absolute bottom-0 w-full h-2 bg-gray-300 rounded">
            <div className="road-lines absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-white"></div>
          </div>

          {/* Delivery Scooter with Rider */}
          <div className="delivery-scooter absolute bottom-2 left-0 w-24 h-16">
            {/* Rider */}
            <div className="rider absolute -top-8 left-4">
              {/* Head */}
              <div className="w-4 h-4 bg-orange-400 rounded-full mb-1 relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              {/* Body */}
              <div className="w-3 h-6 bg-blue-500 rounded mx-auto relative">
                {/* Arms */}
                <div className="absolute -left-2 top-1 w-4 h-1 bg-orange-400 rounded transform rotate-12"></div>
                <div className="absolute -right-1 top-1 w-3 h-1 bg-orange-400 rounded transform -rotate-12"></div>
              </div>
              {/* Legs */}
              <div className="flex justify-center space-x-1 mt-1">
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
                <div className="w-1 h-4 bg-blue-600 rounded"></div>
              </div>
            </div>

            {/* Scooter Body */}
            <div className="absolute bottom-0 left-2 w-16 h-6 bg-red-500 rounded-lg">
              <div className="absolute top-1 left-1 w-3 h-2 bg-red-600 rounded"></div>
              <div className="absolute top-1 right-1 w-8 h-2 bg-red-600 rounded"></div>
            </div>

            {/* Delivery Box */}
            <div className="absolute -top-2 right-0 w-6 h-6 bg-primary rounded border-2 border-yellow-500">
              <div className="absolute top-1 left-1 w-4 h-1 bg-primary-hover"></div>
              <div className="absolute top-3 left-1 w-4 h-1 bg-primary-hover"></div>
            </div>

            {/* Wheels */}
            <div className="wheel-front absolute bottom-0 left-1 w-4 h-4 bg-black rounded-full">
              <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
            <div className="wheel-back absolute bottom-0 right-2 w-4 h-4 bg-black rounded-full">
              <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Speed Lines */}
          <div className="speed-lines absolute top-8 left-0">
            <div className="w-8 h-0.5 bg-gray-400 mb-2 opacity-60"></div>
            <div className="w-6 h-0.5 bg-gray-400 mb-2 opacity-40"></div>
            <div className="w-10 h-0.5 bg-gray-400 opacity-80"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-main mb-2">Cravo</h2>
          <p className="text-text-secondary mb-4">
            Preparing your delicious experience...
          </p>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1">
            <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
            <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
            <div className="loading-dot w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <style jsx={'true'}>{`
        .delivery-scooter {
          animation: ride 3s ease-in-out infinite;
        }

        .wheel-front,
        .wheel-back {
          animation: rotate 0.5s linear infinite;
        }

        .speed-lines {
          animation: speedLines 1s ease-in-out infinite;
        }

        .loading-dot:nth-child(1) {
          animation: bounce 1.4s ease-in-out infinite both;
        }

        .loading-dot:nth-child(2) {
          animation: bounce 1.4s ease-in-out 0.2s infinite both;
        }

        .loading-dot:nth-child(3) {
          animation: bounce 1.4s ease-in-out 0.4s infinite both;
        }

        .rider {
          animation: riderBounce 0.5s ease-in-out infinite alternate;
        }

        @keyframes ride {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(80px) translateY(-2px);
          }
          50% {
            transform: translateX(160px) translateY(0px);
          }
          75% {
            transform: translateX(240px) translateY(-1px);
          }
          100% {
            transform: translateX(320px) translateY(0px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes speedLines {
          0% {
            opacity: 0;
            transform: translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateX(-20px);
          }
          100% {
            opacity: 0;
            transform: translateX(-40px);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes riderBounce {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-2px);
          }
        }

        .road-lines {
          background-image: repeating-linear-gradient(
            to right,
            transparent,
            transparent 10px,
            white 10px,
            white 20px
          );
          animation: roadMove 1s linear infinite;
        }

        @keyframes roadMove {
          0% {
            transform: translateX(0px) translateY(-50%);
          }
          100% {
            transform: translateX(-20px) translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default DeliveryLoader;
