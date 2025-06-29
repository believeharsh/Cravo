import { Router } from "express"

const cityRoute = Router();

cityRoute.get("/" , getAllCities) ; 

export default cityRoute ; 