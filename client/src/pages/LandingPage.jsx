import React, { useState } from "react";
import CitiesSection from "../components/LandingPage/CitiesSection";
import CategoriesSection from "../components/LandingPage/CategoriesSection";
import Footer from "../components/LandingPage/FooterSection";
import Navbar from "../components/LandingPage/NavigationSection";
import Hero from "../components/LandingPage/HeroSection";

const LandingPage = () => {

    return (
        <div className="min-h-screen bg-white font-helvetica">
            {/* Hero Section  */}
            <section className="bg-yellow-400 min-h-screen">
                {/* Navbar  */}
                <Navbar />
                {/* Hero Content */}
                <Hero />
            </section>

            {/* Categories */}
            <CategoriesSection />

            {/* Cities We Serve */}
            <CitiesSection />


            {/* Footer */}
            <Footer />
        </div>
    )
}

export default LandingPage; 
