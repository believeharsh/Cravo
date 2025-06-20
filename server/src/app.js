import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }))


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// app.use(cookieParser())
// app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.json("Hello, from server")
});





export { app }