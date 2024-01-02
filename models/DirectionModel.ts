import mongoose from "mongoose";

const directionSchema = new mongoose.Schema({

    coopId:{
        type: String,
        index: true,
        default: "655321a339c1307c069616e9"
    },

    bound:{
        type: String,
        index: true,
        required: true
    },

    origin:{
        type: String,
        index: true,
        required: true
    },

    destination:{
        type:String,
        index: true,
        required: true
    },

    code:{
        type: String,
        index: true,
        required: true
    },

    
    minimum_fare:{
        type: Number,
        index: true,
        default:0,
        required: false
    },

    discount:{
        type: Number,
        index: true,
        default:0,
        required: false
    },

    pricePerKM:{
        type: Number,
        index: true,
        default:0,
        required: false
    },

    first_km:{
        type: Number,
        index: true,
        default:0,
        required: false
    },

    createdAt:{
        type:Date,
        index: true,
        default: () => new Date,
    },


    updatedAt:{
        type: Date,
        index: true,
        default: () => new Date,
    },

});

const DirectionModel = mongoose.model('directionrecords', directionSchema, { collection: 'directionrecords'}.collection);

export default DirectionModel;