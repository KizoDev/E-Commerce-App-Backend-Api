import { IProduct } from "models/product";
import Product from "models/product";


export const createProduct = async (productInput:IProduct):Promise<IProduct> =>{
    try {
        const newproduct = await Product.create(productInput)
        return newproduct
        
    } catch (error) {
        throw new Error(`error creating product${error.message}`);
        
    }
}

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const product = await Product.find()
        return product
    } catch (error) {
        throw new Error(`error getting products:${error.message}`);
        
    }
}

export const getProductById = async (productId:string):Promise<IProduct | null> =>{
    try {
        const product = await Product.findById(productId)
        return product
    } catch (error) {
        throw new Error(`error getting the products${error.message}`);
        
    }
} 

export const updateProduct = async(
    productid:string, 
    updateproduct:Partial<IProduct>):Promise<IProduct | null> => {
        try {
            const product = await Product.findByIdAndUpdate(productid, updateproduct)
            return product
        } catch (error) {
            throw new Error(`error getting products:${error.message}`);
            
        }
    }

export const deleteProduct = async (productId:string):Promise<void> => {
    try {
        await Product.findByIdAndDelete(productId)

    } catch (error) {
        throw new Error(`error deleting this product:${error.message}`);
        
    }
}