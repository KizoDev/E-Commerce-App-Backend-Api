
import User, { IUser } from "../models/user";
import { hashPassword, comparePassword} from "../Utils/passwordutils";
import { generatetoken } from "../Utils/jwtutils";

export const createUser = async(userInput:IUser):Promise<IUser | null> => {

    try {
        const hashedpassword = hashPassword(userInput.password);

        const newUser = await User.create({
            ...userInput, password: hashedpassword})

            return newUser
    } catch (error) {
        throw new Error("error creating new user");
        
    }
}

export const loginUser = async (
    email:string,
    password:string
): Promise<{ user: Omit<IUser, "password">; token:string }> =>{
    try {
        const user = await User.findOne({email})
        if (!user) {
            throw new Error("user not found");
            
        }
        const isPasswordvalid = await comparePassword(password, user.password);
        if (!isPasswordvalid) {
            throw new Error("invalid credential");
            
        }

        const token = generatetoken ({
            id:user._id,
            username:user.username,
            email:user.email,
            isadmin:user.isAdmin
        })
        const {password: _password, ...userData} = user.toObject();
        return {user: userData as Omit<IUser, "password">, token  }

        } catch (error) {
            throw new Error(`error logging in: ${error.message}`);
            
        
    }

}

export const getAlluser = async (): Promise<IUser[]> =>{
    try {
        const users = await User.find()
        return users

    } catch (error) {
        throw new Error("error finding users");
        
    }
    
}
      ///getting users with saved products

export const getUserById = async (userid: string): Promise<IUser | null> => {
    try {
        const users = await User.findById(userid).populate("savedproduct")
        return users
    } catch (error) {
        throw new Error(`error getting users: ${error.message}`);
        
    }
}

export const updateUser = async (
    userId :string, 
    updatedUser: Partial<IUser>)
    :Promise<IUser | null> => {
        try {
            const user = await User.findByIdAndUpdate(userId, updatedUser,
                {new:true
                })
                return user
        } catch (error) {
            throw new Error("error updating user");
            
            
        }

}

export const deleteUser = async (userId:string):Promise<void> => {
    try {
        await User.findByIdAndDelete(userId)
        
    } catch (error) {
        throw new Error("error deleting user");
        
    }
}
    








