import { Request, Response } from "express";
import * as ProductService from "../Services/productService";


export const cretaeproduct = async (req:Request, res:Response):Promise<void> => {
    try {
        const newproduct = await ProductService.createProduct(req.body)
        res.json({
            status: 201,
            message: "product created successful" ,
            successfull:true,
            data:newproduct,
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error creating product${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const getAllproducts = async (req:Request, res:Response):Promise<void> => {
    try {
        const products = await ProductService.getAllProducts()
        res.json({
            status: 201,
            message: "products gotten successful" ,
            successfull:true,
            data:products,
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error getting products${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const getProductById = async (req:Request, res:Response):Promise<void> => {
    try {
        const product = await ProductService.getProductById(req.params.productId)

        if (product) {
            res.json({
                status: 201,
                message: "products gotten successful" ,
                successfull:true,
                data:product,
              })
        } else {
            res.json({
                status: 401,
                message: 'error getting product',
                successfull:false,
                data:null
              })
        }
    } catch (error) {
        res.json({
            status: 401,
            message: `error getting product${error.message}`,
            successfull:false,
            data:null
          })
    }
}
export const updateProduct = async (req:Request, res:Response):Promise<void> => {
    try {
        const product = await ProductService.updateProduct(req.params.productId, req.body)
        if (product) {
            res.json({
                status: 201,
                message: "products updated successful" ,
                successfull:true,
                data:product,
              })
        } else {
            res.json({
                status: 401,
                message: 'error updating products',
                successfull:false,
                data:null
              })
        }
    } catch (error) {
        res.json({
            status: 401,
            message: `error updating product${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const deleteProduct = async (req:Request, res:Response):Promise<void> => {
    try {
        await ProductService.deleteProduct(req.params.productId)
        res.status(200).send()
    } catch (error) {
        res.json({
            status: 401,
            message: `error deleting product${error.message}`,
            successfull:false,
            data:null
          })
    }
}


