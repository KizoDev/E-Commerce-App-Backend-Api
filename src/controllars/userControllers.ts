import { Response, Request } from "express";
import * as UserService from "../Services/userService";

export const createUser = async (req:Request, res:Response):Promise<void> =>{
    try {
        const newUser = UserService.createUser(req.body)
        res.json({
            status: 201,
            message: "user created successful" ,
            successfull:true,
            data:newUser
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error creating user${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const loginUser = async(req:Request, res:Response):Promise<void> => {
    const {email , password} = req.body
    try {
        const {user, token} = await UserService.loginUser(email, password)
        res.json({
            status: 201,
            message: "user login successful" ,
            successfull:true,
            data:user,
            token:token
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error logining user${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const getAlluser = async (req:Request, res:Response):Promise<void> => {
    try {
        const users = await UserService.getAlluser()
        res.json({
            status: 201,
            message: "users gotten successful" ,
            successfull:true,
            data:users,
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error getting the users${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const getUserById = async (req:Request, res:Response):Promise<void> => {
    try {
        const user = await UserService.getUserById(req.body.userId)
        if (!user) {
            res.json({
                status: 404,
                message: 'user not found',
                successfull:false,
                data:null
              })
        }
        res.json({
            status: 201,
            message: "user gotten successful" ,
            successfull:true,
            data:user,
          })
    } catch (error) {
        res.json({
            status: 401,
            message: `error getting the user${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const updateUser = async (req:Request, res:Response):Promise<void> => {
    try {
        const updateuser = await UserService.updateUser(req.params.userId, req.body)
        if (updateuser) {
            res.json({
                status: 201,
                message: "user updated successful" ,
                successfull:true,
                data:updateuser,
              })
        } else {
            res.json({
                status: 404,
                message: 'user not found',
                successfull:false,
                data:null
              })
        }
    } catch (error) {
        res.json({
            status: 401,
            message: `error updating the user${error.message}`,
            successfull:false,
            data:null
          })
    }
}

export const deleteUser = async (req:Request, res:Response):Promise<void> => {
    try {
        await UserService.deleteUser(req.params.userId)
        res.status(200).send()
    } catch (error) {
        res.json({
            status: 401,
            message: `error deleting the user${error.message}`,
            successfull:false,
            data:null
          })
    }
}