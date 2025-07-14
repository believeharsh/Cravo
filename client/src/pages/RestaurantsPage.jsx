import React, { useEffect } from "react";
import RestaurantNavbar from "../components/RestaurantPage/RestarurantNavbar";
import TopRestaurants from "../components/RestaurantPage/TopRestaurants";
import RestaurantGrid from "../components/RestaurantPage/RestRestaurant";
import NearbyCuisineGrid from "../components/RestaurantPage/Near-restaurants-card";
import Footer from "../components/Footer";

import { useDispatch, useSelector } from "react-redux";
import CategoriesSlider from "../components/LandingPage/CategoriesSection";

const RestaurantPage = () => {
  const dispatch = useDispatch();
  // We'll check if the data is already loaded in Redux
  const {data} = useSelector((state) => state.landingPage) ; 
  console.log(data) ; 
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

export default RestaurantPage;
