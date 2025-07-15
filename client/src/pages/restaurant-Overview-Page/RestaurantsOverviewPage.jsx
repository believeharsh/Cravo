import React, { useEffect } from "react";

// Restaurant-Overview-Page sections import
import RestaurantNavbar from "./sections/RestarurantNavbar";
import RestaurantGrid from "./sections/RestRestaurant";
import NearbyCuisineGrid from "./sections/Near-restaurants-card";
import Footer from "../../components/Footer";
import CategoriesSlider from "../landingPage/sections/CategoriesSection";
import TopRestaurants from "./sections/TopRestaurants";

const RestaurantsOverviewPage = () => {
  return (
    <>
      <RestaurantNavbar />
      <div className={"mt-15"}>
        <CategoriesSlider />
        <TopRestaurants />
        <RestaurantGrid />
        <NearbyCuisineGrid />
        <Footer />
      </div>
    </>
  );
};

export default RestaurantsOverviewPage;
