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
        required: true
    },

    discount:{
        type: Number,
        index: true,
        required: true
    },

    pricePerKM:{
        type: Number,
        index: true,
        required: true
    },

    first_km:{
        type: Number,
        index: true,
        required: true
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