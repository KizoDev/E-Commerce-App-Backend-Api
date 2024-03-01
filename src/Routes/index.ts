import express from "express";

import userRoute from "../Routes/userRoute";
import productRoute from "../Routes/productRoutes";
import userRoutes from "../Routes/userRoute";
const router = express.Router()

export default (): express.Router => {

    userRoutes(router)

    productRoute(router)

    return router

}

