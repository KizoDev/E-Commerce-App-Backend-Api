import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document{
    email:string
    username:string
    password: string
    isAdmin: boolean
    savedProducts: Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema({
    email:{
        type:String,
        requred:true
    },
    username:{
        type:String,
        requred:true
    },
    password:{
        type:String,
        requred:true
    },
    isAdmin:{
        type:Boolean,
        requred:true
    },
    
    savedProducts:[{ type: mongoose.Schema.Types.ObjectId,
         ref:"Product"}]

}, {timestamps:true})

export default mongoose.model<IUser>("User", userSchema)