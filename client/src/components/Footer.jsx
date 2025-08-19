import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/Icon';

const InternalLinkItem = ({ to, children }) => (
  <Link
    to={to}
    className="block text-sm text-gray-500 hover:text-gray-800 transition"
  >
    {children}
  </Link>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 pt-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* top grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* logo & tagline */}
        <div className="col-span-2">
          {/* swap the SVG/emoji with your real logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center">
              <img src={`/assets/Cravo_logo.png`} alt="Cravo Logo" />{' '}
              {/* Added alt text */}
            </div>
            <div className="w-10 sm:w-32 ">
              <img
                src={`/assets/Cravo_white_text_logo.png`}
                alt="Cravo Text Logo"
              />{' '}
              {/* Added alt text */}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Bringing your favourite dishes from the best restaurants straight to
            your doorstep.
          </p>
        </div>

        {/* link columns */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <InternalLinkItem to="/about-us">About Us</InternalLinkItem>
          <InternalLinkItem to="/careers">Careers</InternalLinkItem>
          <InternalLinkItem to="/blog">Blog</InternalLinkItem>
          <InternalLinkItem to="/press">Press</InternalLinkItem>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <InternalLinkItem to="/terms-of-service">
            Terms&nbsp;of&nbsp;Service
          </InternalLinkItem>
          <InternalLinkItem to="/privacy-policy">
            Privacy&nbsp;Policy
          </InternalLinkItem>
          <InternalLinkItem to="/cookie-policy">
            Cookie&nbsp;Policy
          </InternalLinkItem>
          <InternalLinkItem to="/refund-policy">
            Refund&nbsp;Policy
          </InternalLinkItem>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Available</h4>
          <a
            href="https://apps.apple.com/us/app/cravo-ios" // Replace with actual app store links
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-500 hover:text-gray-800 transition"
          >
            iOS&nbsp;App
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.cravo.android"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-500 hover:text-gray-800 transition"
          >
            Android&nbsp;App
          </a>
          <InternalLinkItem to="/">Web&nbsp;Ordering</InternalLinkItem>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between">
        {/* social icons */}
        <div className="flex space-x-4 mb-6 sm:mb-0">
          <a
            href="https://www.facebook.com/yourcravoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Facebook"
          >
            <Icon name={'facebook'} size={18} />
          </a>
          <a
            href="https://www.instagram.com/yourcravoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Instagram"
          >
            <Icon name={'instagram'} size={18} />
          </a>
          <a
            href="https://twitter.com/yourcravoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Twitter"
          >
            <Icon name={'twitter'} size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/yourcravoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="LinkedIn"
          >
            <Icon name={'linkedin'} size={18} />
          </a>
          <a
            href="https://www.youtube.com/yourcravoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="YouTube"
          >
            <Icon name={'youtube'} size={18} />
          </a>
        </div>

        {/* copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} FoodZone Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
