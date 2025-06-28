import { Router } from "express";
import { getAllRestaurantsByCategory, getRestaurantById} from "../controllers/restaurant.controller.js";

const restaurantRoute = Router() ; 

restaurantRoute.get("/", getAllRestaurantsByCategory)
restaurantRoute.get("/:restaurantId", getRestaurantById)

export default restaurantRoute ; 