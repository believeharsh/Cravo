import React, { useState, useEffect } from "react";
import CitiesSection from "./sections/CitiesSection";
import Footer from "./sections/FooterSection";
import Navbar from "./sections/NavigationSection";
import Hero from "./sections/HeroSection";
import RestaurantsSection from "./sections/RestaurantsSection";
import CategoriesSlider from "./sections/CategoriesSection";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-white font-helvetica">
      {/* Hero Section */}
      <section className="bg-yellow-400 min-h-screen">
        <Navbar />
        <Hero />
      </section>

      {/* Content Sections */}
      <CategoriesSlider />
      <CitiesSection />
      <RestaurantsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;