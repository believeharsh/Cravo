import React from 'react';
import Icon from '../../../components/ui/Icon';

const LinkItem = ({ href, children }) => (
  <a
    href={href}
    className="block text-sm text-gray-500 hover:text-gray-800 transition"
  >
    {children}
  </a>
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
              <img src={`/assets/Cravo_logo.png`} alt="" />
            </div>
            <div className="w-10 sm:w-32 ">
              <img src={`/assets/Cravo_white_text_logo.png`} alt="" />
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
          <LinkItem href="">About Us</LinkItem>
          <LinkItem href="">Careers</LinkItem>
          <LinkItem href="">Blog</LinkItem>
          <LinkItem href="">Press</LinkItem>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <LinkItem href="">Terms&nbsp;of&nbsp;Service</LinkItem>
          <LinkItem href="">Privacy&nbsp;Policy</LinkItem>
          <LinkItem href="">Cookie&nbsp;Policy</LinkItem>
          <LinkItem href="">Refund&nbsp;Policy</LinkItem>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Available</h4>
          <LinkItem href="">iOS&nbsp;App</LinkItem>
          <LinkItem href="">Android&nbsp;App</LinkItem>
          <LinkItem href="">Web&nbsp;Ordering</LinkItem>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between">
        {/* social icons */}
        <div className="flex space-x-4 mb-6 sm:mb-0">
          <a
            href="#"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Facebook"
          >
            <Icon name={'facebook'} size={18} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Instagram"
          >
            <Icon name={'instagram'} size={18} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="Twitter"
          >
            <Icon name={'twitter'} size={18} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            aria-label="LinkedIn"
          >
            <Icon name={'linkedin'} size={18} />
          </a>
          <a
            href="#"
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
