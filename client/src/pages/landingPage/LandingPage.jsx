import React from 'react';
import CitiesSection from './sections/CitiesSection';
import LandingNavigation from './sections/NavigationSection';
import Hero from './sections/HeroSection';
import CategoriesSlider from './sections/CategoriesSection';
import RestaurantsSection from './sections/RestaurantsSection';
import AuthSidebar from '../../components/modules/auth/AuthSidebar';
import Footer from '../../components/Footer';
import GetTheAppSection from './sections/GetTheAppSection';
import BestDineOutSection from './sections/DineOutRestaurantSection';

const LandingPage = () => {
  return (
    <div className="">
      <div className=" bg-white font-helvetica">
        {/* Hero Section */}
        <section className="bg-primary">
          <LandingNavigation />
          <Hero />
        </section>

        {/* Content Sections */}
        <CategoriesSlider />
        <RestaurantsSection />
        <BestDineOutSection />
        <GetTheAppSection />
        <CitiesSection />
        <Footer />
        <AuthSidebar />
      </div>
    </div>
  );
};

export default LandingPage;
