import mongoose from "mongoose";

const violationSchema = new mongoose.Schema({
    coopId:{
        
        type: String,
        index:true,

    },
    UUID:{
        type: String,
        index: true,
        required: true,
        unique: true
    },

    device_id:{
        type: String,
        index: true,
        required: true
    },

    control_no:{
        type: String,
        index: true,
        required: true
    },

    tor_no:{
        type: String,
        index: true,
        required: true
    },

    date_of_trip:{
        type: Date,
        index: true,
        required: true
    },

    bus_no:{
        type: String,
        index: true,
        default:""
    },

    route:{
        type: String,
        index: true,
        default:""
    },

    route_code:{
        type: String,
        index: true,
        default:""
    },

    bound:{
        type: String,
        index: true,
        default:"SOUTH"
    },

    trip_no:{
        type: Number,
        index: true,
        default:0
    },

    inspector_emp_no:{
        type: String,
        index: true,
        default:""
    },

    inspector_emp_name:{
        type: String,
        index: true,
        default:""
    },

    onboard_time:{
        type: String,
        index: true,
        default:""
    },

    onboard_place:{
        type: String,
        index: true,
        default:""
    },

    onboard_km_post:{
        type: Number,
        index: true,
        default: 0
    },

    employee_name:{
        type: String,
        index: true,
        required: true
    },

    employee_violation:{
        type: String,
        index: true,
        required: true
    },

    timestamp:{
        type: String,
        index: true,
    },

    lat:{
        type: String,
        index: true,
    },

    long:{
        type: String,
        index: true,
    },

    isUploaded:{

        type: Boolean,
        default : false,
        index: true,

    },
    dateCreated:{
        type: Date,
        index: true,
        default: () => new Date(),
    },

})


const torViolationSchema = new mongoose.Schema({
    portalId: {},
    recordId: {
        type: String,
        index: true,
    },

    modId:{
        type: String,
        index: true,
    },

    fieldData: [violationSchema]
})

const TORViolationModel = mongoose.model("torviolationrecords", torViolationSchema, {collections: "torviolationrecords"}.collections);

export default TORViolationModel;
