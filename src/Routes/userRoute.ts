import express   from "express";

import { 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization
} from "../Utils/jwtutils";

import { 
    createUser, 
    loginUser, 
    getAlluser, 
    getUserById, 
    deleteUser, 
    updateUser 
} from "../controllars/userControllers";

const userRoutes = (router: express.Router) => {

    // router for creating newuser
    router.post("users/create", createUser)

    // route for loggin  users
    router.post("users/login", loginUser)

    // route for getting alluser
    router.get("users/getusers", verifyTokenAndAdmin, getAlluser) 

    // route for getting user by id
    router.get("users,getuser", getUserById)

    //route for updating user(protected, only account owner or admin)
    router.put("users/update",verifyTokenAndAuthorization,  updateUser)

    // route for deleting user(protected, only accessible by admin)
    router.delete("users/delete", verifyTokenAndAdmin, deleteUser)


}

export default userRoutes