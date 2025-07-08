import React, { useState, useEffect } from "react";
import CitiesSection from "../components/LandingPage/CitiesSection";
import CategoriesSection from "../components/LandingPage/CategoriesSection";
import Footer from "../components/LandingPage/FooterSection";
import Navbar from "../components/LandingPage/NavigationSection";
import Hero from "../components/LandingPage/HeroSection";

import { fetchLandingPageData } from "../features/landing/landingSlice";
import { useDispatch, useSelector } from "react-redux";
import RestaurantsSection from "../components/LandingPage/RestaurantsSection";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.landingPage);

  useEffect(() => {
    // Get user's geolocation and then dispatch the data fetch
    const getUserLocationAndFetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(
              fetchLandingPageData({ longitude, latitude, maxDistanceKm: 500 })
            );
          },
          // Error callback - fallback to default data
          (geoError) => {
            console.warn("Geolocation error:", geoError.message);
            dispatch(fetchLandingPageData({}));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.warn(
          "Geolocation is not supported by this browser. Fetching default content."
        );
        dispatch(fetchLandingPageData({}));
      }
    };

    getUserLocationAndFetchData();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white font-helvetica">
      {/* Hero Section */}
      <section className="bg-yellow-400 min-h-screen">
        <Navbar />
        <Hero />
      </section>

      {/* Content Sections */}
      <CategoriesSection />
      <CitiesSection />
      <RestaurantsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;