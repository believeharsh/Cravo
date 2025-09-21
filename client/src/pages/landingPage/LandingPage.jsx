import React from 'react';
import CitiesSection from './sections/CitiesSection';
import Footer from './sections/FooterSection';
import LandingNavigation from './sections/NavigationSection';
import Hero from './sections/HeroSection';
import CategoriesSlider from './sections/CategoriesSection';
import RestaurantsSection from './sections/RestaurantsSection';
import AuthSidebar from '../../components/modules/auth/AuthSidebar';

const LandingPage = () => {
  return (
    <div className="">
      <div className=" bg-white font-helvetica">
        {/* Hero Section */}
        <section className="bg-yellow-400 min-h-screen">
          <LandingNavigation />
          <Hero />
        </section>

        {/* Content Sections */}
        <CategoriesSlider />
        <RestaurantsSection />
        <CitiesSection />
        <Footer />
        <AuthSidebar />
      </div>
    </div>
  );
};

export default LandingPage;
