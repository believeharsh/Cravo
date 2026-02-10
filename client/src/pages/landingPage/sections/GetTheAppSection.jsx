import React from 'react';
import Icon from '../../../components/ui/Icon';

const GetTheAppSection = () => {
  return (
    <section className="bg-gray-900 text-white py-12 md:py-16 overflow-hidden my-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content: Title and Description */}
        <div className="md:w-3/5 text-center md:text-left space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Cravo: Faster, Fresher, Yours.
            </span>
            Download Today!
          </h2>
          <p className="text-base text-gray-400 md:w-5/6 mx-auto md:mx-0">
            Get exclusive app-only deals and real-time delivery tracking right
            on your smartphone.
          </p>
        </div>

        {/* Right Content: Download Buttons and Minimal QR Code */}
        <div className="md:w-2/5 flex flex-col items-center md:items-end space-y-4">
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <button className="flex items-center gap-2 px-5 py-2 bg-primary-hover text-text-main font-bold rounded-xl shadow-lg hover:bg-primary transition-all duration-300 transform hover:scale-[1.02]">
              <Icon name="download" className="w-5 h-5" />
              App Store
            </button>

            {/* Google Play Button */}
            <button className="flex items-center gap-2 px-5 py-2 bg-primary-hover text-text-main font-bold rounded-xl shadow-lg hover:bg-primary transition-all duration-300 transform hover:scale-[1.02]">
              <Icon name="download" className="w-5 h-5" />
              Google Play
            </button>
          </div>

          {/* QR Code Display */}
          <div className="flex items-center gap-3 bg-gray-800 p-2 pl-3 rounded-xl border border-yellow-500/30 mt-4 shadow-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-lg flex items-center justify-center">
              <Icon name="qr-code" className="w-5 h-5 text-text-main" />
            </div>
            <p className="text-sm text-gray-300 font-medium pr-1">
              Scan for instant download link
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetTheAppSection;
