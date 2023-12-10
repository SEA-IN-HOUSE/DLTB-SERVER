import mongoose from "mongoose";

const dispatchModel = new mongoose.Schema({

    coopName: {
        type: String,
        index: true,
        required: true
    },

    designation:{
        type: String,
        index: true,
        required : true
    },

    torNo:{
        type: String,
        index: true,
        required: true
    },

    otNo:{
        type: String,
        index: true,
        required: true
    },

    atm:{
        type: String,
        index: true,
        required: true
    },

    date:{
        type: Date,
        index: true,
        default: new Date
    },

    tripNo:{
        type: String,
        index: true,
        required: true
    },

    bound : {
        type: String,
        index: true,
        required: true
    },

    route : {
        type: String,
        index: true,
        required: true
    },

    driverName : {
        type: String,
        index: true,
        required: true
    },

    conductorName : {
        type: String,
        index: true,
        required: true
    },

    dispatcherName : {
        type: String,
        index: true,
        required: true
    },

    trip : {
        type: String,
        index: true,
        required: true
    },


})

const DispatchModel = mongoose.model('DispatchRecords', dispatchModel);

export default DispatchModel;