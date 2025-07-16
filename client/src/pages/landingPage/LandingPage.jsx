import React from "react";
import CitiesSection from "./sections/CitiesSection";
import Footer from "./sections/FooterSection";
import Navbar from "./sections/NavigationSection";
import Hero from "./sections/HeroSection";
import CategoriesSlider from "./sections/CategoriesSection";
import RestaurantsSection from "./sections/RestaurantsSection";

const LandingPage = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-white font-helvetica">
        {/* Hero Section */}
        <section className="bg-yellow-400 min-h-screen">
          <Navbar />
          <Hero />
        </section>

        {/* Content Sections */}
        <CategoriesSlider />
        <RestaurantsSection />
        <CitiesSection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
