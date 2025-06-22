import { Router } from "express";
import { getAllCategories } from "../controllers/category.controller.js";

const categoryRoute = Router() ; 

categoryRoute.get("/", getAllCategories)

export default categoryRoute ; 