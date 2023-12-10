import mongoose, {Document}  from "mongoose";
import { connectToFilipayDB } from "../databases/DbConnection";

const filipayUrl : string = process.env.DB_FILIPAY_CONNECTION_STRING ? process.env.DB_FILIPAY_CONNECTION_STRING : '';


export interface IRider extends Document{

    name: String,
    emailStatus: String,
    cardId: String,
    email: String,
    password: String
    createdAt: Date,
    updateAt: Date,
    sNo: String,
    
}

const riderSchema = new mongoose.Schema({

    name :{
        type: String,
        required: true,
        index: true,
    },

    emailStatus:{
        type: String,
        required: true,
        index: true,
    },

    cardId: {
        type: String,
        required: true,
        index: true
    },

    email:{
        type: String,
        required: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        index: true
    },

    createdAt:{
        type: Date,
        default: new Date,
    },

    updatedAt:{
        type: Date,
        default: new Date,
    },

    sNo:{
        type: String,
        required: true,
        index: true
    }

})

const RiderModel = connectToFilipayDB(filipayUrl).model("rider" , riderSchema,{ collection: "rider" }.collection);

export default RiderModel;