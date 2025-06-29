import { Router } from "express";
import { getAllRestaurantsByCategory, getRestaurantById, getRestaurantsByLocation} from "../controllers/restaurant.controller.js";

const restaurantRoute = Router() ; 


restaurantRoute.get("/location" , getRestaurantsByLocation)
restaurantRoute.get("/", getAllRestaurantsByCategory)
restaurantRoute.get("/:restaurantId", getRestaurantById)


export default restaurantRoute ; 