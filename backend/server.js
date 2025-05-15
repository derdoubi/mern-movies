import express from "express";

import cookieParser from "cookie-parser";

import dotenv from "dotenv"

import path from "path"





// files

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import genreRoutes from "./routes/genreRoutes.js"
import moviesRoutes from "./routes/moviesRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
// Configuration 

dotenv.config()
connectDB()


const app = express()

// middlewares 


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())




const PORT = process.env.PORT || 3000;
// Routes 

app.use('/api/users' , userRoutes)
app.use('/api/genre' , genreRoutes)
app.use("/api/movies" , moviesRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

app.use("/uploads" , express.static(path.join(__dirname + "/uploads")))
app.listen(PORT , () => console.log(`Server is running on port ${PORT}`))