import React from 'react';
import {
  GithubIcon,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';

const InternalLinkItem = ({ to, children }) => (
  <a
    href={to}
    className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-sm font-medium"
  >
    {children}
  </a>
);

const ExternalLinkItem = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-sm font-medium"
  >
    {children}
  </a>
);

const SocialIcon = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-gray-300 hover:text-yellow-500 hover:border-yellow-500 hover:shadow-md transition-all duration-200"
    aria-label={label}
  >
    <Icon size={18} />
  </a>
);

const Footer = () => (
  <footer className="bg-gray-800 border-t border-border">
    {/* Main Footer Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Brand Section */}
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center space-x-1 mb-4">
            <div className="w-18 h-18 rounded-xl  cursor-pointer">
              <img src="/assets/Cravo_logo.png" alt="Cravo Logo" />
            </div>
            <div className="w-32">
              <img
                src="/assets/Cravo_white_text_logo.png"
                alt="Cravo Text Logo"
                className="h-10"
              />
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-sm">
            Bringing your favourite dishes from the best restaurants straight to
            your doorstep.
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-yellow-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-yellow-500" />
              <span>my@cravoindia.com</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-yellow-500" />
              <span>, Your City</span>
            </div> */}
          </div>
        </div>

        {/* Company Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-200 text-md tracking-wide">
            Company
          </h4>
          <div className="space-y-2 flex flex-col text-300">
            <InternalLinkItem to="/about-us">About Us</InternalLinkItem>
            <InternalLinkItem to="/careers">Careers</InternalLinkItem>
            <InternalLinkItem to="/team">Team</InternalLinkItem>
            <InternalLinkItem to="/press">Press</InternalLinkItem>
          </div>
        </div>

        {/* Services Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-200 text-md tracking-wide">
            Services
          </h4>
          <div className="space-y-2 flex flex-col">
            <InternalLinkItem to="/cravo-one">Cravo One</InternalLinkItem>
            <InternalLinkItem to="/cravo-instamart">Instamart</InternalLinkItem>
            <InternalLinkItem to="/cravo-dineout">Dineout</InternalLinkItem>
            <InternalLinkItem to="/cravo-genie">Genie</InternalLinkItem>
          </div>
        </div>

        {/* Partners Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-200 text-md tracking-wide">
            Partners
          </h4>
          <div className="space-y-2 flex flex-col">
            <InternalLinkItem to="/partner-with-us">
              Restaurants
            </InternalLinkItem>
            <InternalLinkItem to="/for-riders">
              Delivery Partners
            </InternalLinkItem>
            <InternalLinkItem to="/for-businesses">Businesses</InternalLinkItem>
            <InternalLinkItem to="/cravo-corporate">Corporate</InternalLinkItem>
          </div>
        </div>

        {/* Support & Apps */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-200 text-md tracking-wide">
            Support
          </h4>
          <div className="space-y-2 flex flex-col">
            <InternalLinkItem to="/contact-us">Help Center</InternalLinkItem>
            <InternalLinkItem to="/privacy-policy">Privacy</InternalLinkItem>
            <InternalLinkItem to="/terms-of-service">Terms</InternalLinkItem>
            <ExternalLinkItem href="https://apps.apple.com/us/app/cravo-ios">
              iOS App
            </ExternalLinkItem>
            <ExternalLinkItem href="https://play.google.com/store/apps/details?id=com.cravo.android">
              Android App
            </ExternalLinkItem>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300 mr-2">Follow us:</span>
            <SocialIcon
              Icon={GithubIcon}
              href="https://github.com/believeharsh"
              label="Facebook"
            />
            <SocialIcon
              Icon={Twitter}
              href="https://x.com/believeharsh?t=TIwrahwHjYlsDs8-EbUxig&s=09"
              label="Twitter"
            />
            <SocialIcon
              Icon={Instagram}
              href="https://www.instagram.com/theharshdahiya1/"
              label="Instagram"
            />
            <SocialIcon
              Icon={Linkedin}
              href="https://www.linkedin.com/in/believeharsh11/"
              label="LinkedIn"
            />
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>© {new Date().getFullYear()} Cravo Limited</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Made with ❤️ for food lovers
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
