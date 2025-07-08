import React from "react" ; 
import RestaurantNavbar from "../components/RestaurantPage/RestarurantNavbar";
import CategoriesSection from "../components/LandingPage/CategoriesSection";
import TopRestaurants from "../components/RestaurantPage/TopRestaurants";
import RestaurantGrid from "../components/RestaurantPage/RestRestaurant";
import NearbyCuisineGrid from "../components/RestaurantPage/Near-restaurants-card";
import Footer from "../components/Footer";

import { useDispatch, useSelector } from 'react-redux';

const RestaurantPage = () => {
      const authState = useSelector((state) => state.auth);
      console.log(authState)
    
    return (
        <>
            <div className="">
                <RestaurantNavbar/>
                <CategoriesSection/>
                <TopRestaurants/>
                <RestaurantGrid/>
                <NearbyCuisineGrid/>
                <Footer/>
            </div>
        </>
    )
}

export default RestaurantPage ; 