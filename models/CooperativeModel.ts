import mongoose, {Document} from "mongoose"

export interface ICooperative extends Document{

    cooperativeName : string,

    cooperativeCodeName : string,

    minimumFare : number,

    first_km : number,

    pricePerKm: number,
    
    discountPercent: number,

    createdAt: Date,

}

const cooperativeSchema = new mongoose.Schema({
    
    cooperativeName : {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    cooperativeCodeName : {

        type: String,
        required : true,
        unique: true,
        index: true

    },

    minimumFare:{
        type: Number,
        required: false,
        index: true,
    },
    
    first_km:{
        type : Number,
        required: false,
        index: true,
    },

    pricePerKm:{
        type: Number,
        required: false,
        index: true,
    },

    discountPercent:{
        type: Number,
        required: false,
        index: true
    },

    createdAt:{
        type: Date,
        default: new Date(),
        index: true
    }


})

const CooperativeModel = mongoose.model("cooperativesrecords",cooperativeSchema, { collection: "cooperativesrecords"}.collection );

export default CooperativeModel;