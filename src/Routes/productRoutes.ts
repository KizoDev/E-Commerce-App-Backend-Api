import express from "express";

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
  } from "../Utils/jwtutils";

import { 
    cretaeproduct,
    getAllproducts,
    getProductById,
    updateProduct,
    deleteProduct
 } from "../controllars/productControllers";

const productRouter = (router: express.Router) => {

    //getting all user
    router.get("products/getall", getAllproducts)

    // route for creating new product(protected, only accessible by admin)
    router.post("products/create", verifyTokenAndAdmin, cretaeproduct)

    // route for getting products by id
    router.get("products/productId", verifyToken, getProductById)

    // router for updating products by id(protected, only accessible by admin)
    router.put("products/update", verifyTokenAndAdmin, updateProduct)

    // router for deleting products by id(protected, only accessible by admin)
    router.delete("products/delete", verifyTokenAndAdmin, deleteProduct)

}

export default productRouter
