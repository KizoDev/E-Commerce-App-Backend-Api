import express, { Router } from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()
import helmet from "helmet";
import cors from "cors";
import routes from "./Routes";

const app = express()

app.use(helmet())
app.use(express.json())

if (!process.env.MONGODB_URL) {
    throw new Error("MOMGODB environmental variable is not defined");
    
}

const connectdb = mongoose.connect(process.env.MONGODB_URL)
try {
    if (connectdb) {
        console.log("db connected successfully");
    }
} catch (error) {
    console.log(error);
    
}

app.use("api/vi", routes())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
    
} )
