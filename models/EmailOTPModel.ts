import mongoose, {Document} from "mongoose";

export interface IEmailOTP extends Document{
    _id: Object,
    email : string,
    otpValue : string,
    dateOfExpiration : Date
}

const emailOtpSchema = new mongoose.Schema({
    
    email :{
        type : String,
        required: true,
        index: true
    },

    otpValue : {
        type: String,
        required: true,
        index: true
    },

    dateOfExpiration :{
        type : Date,
        default : () => Date.now() + 10800000, // 3 hours in milliseconds
        index : true
    }
})

const EmailOTPModel = mongoose.model("emailotprecords", emailOtpSchema, { collection : "emailotprecords"}.collection);

export default EmailOTPModel;