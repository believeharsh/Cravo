import React, { useState, useEffect } from "react";
import CitiesSection from "../components/LandingPage/CitiesSection";
import Footer from "../components/LandingPage/FooterSection";
import Navbar from "../components/LandingPage/NavigationSection";
import Hero from "../components/LandingPage/HeroSection";
import { fetchLandingPageData } from "../features/landing/landingSlice";
import { useDispatch, useSelector } from "react-redux";
import RestaurantsSection from "../components/LandingPage/RestaurantsSection";
import CategoriesSlider from "../components/LandingPage/CategoriesSection";

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