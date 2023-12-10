import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({

    coopId:{
        type: String,

        default: "655321a339c1307c069616e9",
      
    },

    vehicle_no: {
        type: String,
        unique: true,
        required: true
    },

    plate_no:{
        type: String,
        // required: true,
        unique: true
    },


    route_code:{
        type: String,
        required: true,
    },

    createdAt:{
        type: Date,
        default: new Date
    },

    updatedAt:{
        type: Date,
        default: new Date
    }

})

const VehicleModel = mongoose.model("vehiclerecords", vehicleSchema, {collection : "vehiclerecords"}.collection);

export default VehicleModel;