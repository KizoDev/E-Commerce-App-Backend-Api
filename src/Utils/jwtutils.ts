import { configDotenv } from "dotenv";
import { Request, Response, NextFunction, response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Types } from "mongoose";



type JWTpayload = {
    id: Types.ObjectId
    username:string
    email:string
    isAdmin: boolean
}  

interface CustomRequest extends Request {
    user: {
        id:Types.ObjectId
        email:string
        username:string
        isAdmin:Boolean

    }
}

export const generatetoken = (payload: JWTpayload):string => {
    if (process.env.JWT_SEC) {
        throw new Error("jwt_sec environmental variable is not defined");
        
    }


const token = jwt.sign(payload, process.env.JWT_SEC, {
    expiresIn:process.env.JWT_EXPIRY_PERIOD,
});
return token
}

// verify token
export const verifyToken = (
    req:CustomRequest, 
    res:Response,
    next: NextFunction
    ):void =>{
    const authHeader = req.headers.token
    if (authHeader) {
        const token = Array.isArray(authHeader)
        ? authHeader[0].split(" ")[1]
        : authHeader.split(" ")[1];

        if (!process.env.JWT_SEC) {
            throw new Error("ENVIRONMENTAL VARIABLE IS NOT DEFINED");
            
        }

        jwt.verify(token, process.env.JWT_SEC, (err:VerifyErrors | null, user:any) =>{
            if (err) return res.status(403).json("token is not valid");
               req.user = user
                next()
            
        } )

    } else {
        throw new Error("you are not authorised");
        
    }

}




//    authorized account
 export const verifyTokenAndAuthorization = (
    req:CustomRequest, 
    res:Response,
    next: NextFunction):
 void =>{
    verifyToken(req, res, () => {
     if (req.user.id.toString() === req.params.id || req.user.isAdmin ) {
         next()     } else {
         return res.status(403).json("You are not allowed to do that!");

     }
    })
 }

// authorize an admin
export const verifyTokenAndAdmin = (
    req:CustomRequest, 
    res:Response,
    next: NextFunction):
void =>{
    verifyToken(req, res,() => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that!");

        }

    })
}

