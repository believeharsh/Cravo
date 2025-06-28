import { Router } from "express";
import { getAllProductByCategory } from "../controllers/product.controller.js";
const productRoute = Router() ; 

productRoute.get("/:categoryName", getAllProductByCategory) 

export default productRoute ; 