import { Router } from "express";
import { getAllProductByCategory, AllProductsOfTheRestaurant } from "../controllers/product.controller.js";
const productRoute = Router() ;

productRoute.get("/restaurantProducts/", AllProductsOfTheRestaurant) ;

productRoute.get("/:categoryName", getAllProductByCategory) ;

export default productRoute ; 