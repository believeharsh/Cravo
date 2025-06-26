import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import authRoute from "./routes/auth.route.js" ; 
import categoryRoute from "./routes/category.route.js";
import path from "path"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use(cookieParser())
app.use(express.static(path.resolve("./public")))


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/categories", categoryRoute)



app.get("/", (req, res) => {
    res.json("Hello, from server")
});





export { app }