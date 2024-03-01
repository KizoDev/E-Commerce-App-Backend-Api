import mongoose, { Schema, Types, Document } from "mongoose";

export interface IProduct extends Document {
    tittle :string
    description: string
    image:string
    category:string
    quantity:string
    instock:boolean
}

const productSchema: Schema <IProduct> = new Schema({
    tittle:{type:String,
            required:true
    },
    description:{type:String,
        required:true
    },
    image:{type:String,
        required:true
    },
    category:{type:String,
        required:true
    },
    quantity:{type:String,
        required:true
    },
    instock:{type:Boolean,
        required:true
    },
    }, {timestamps:true})

export default mongoose.model<IProduct>("Product", productSchema)