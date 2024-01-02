import mongoose from "mongoose";

export interface ITransactionReport {

    _id: string,
    reference_no: string,
    trace_no:string,
    transaction_date_and_time: Date,
    batch_no: string,
    funding_account_no: string,
    sender_name: string,
    destination_bank: string,
    recipient_name: string,
    amount: number,
    total_fee: number,
    status: string,
    receiptUrl: string,
    remarks: string,
    dateCreated: Date,

}

const transactionReportSchema = new mongoose.Schema({

    reference_no :{
        type: String,
        index: true,
        required: true,
        unique: true,
    },

    trace_no :{
        type: String,
        index: true,
        required: true,
        unique: true,
    },

    batch_no :{
        type: String,
        index: true,
        required: true,
        unique: true,
    },

    funding_account_no :{
        type: String,
        index: true,
        required: true,
        unique: true,
    },

    sender_name :{
        type: String,
        index: true,
        required: true,
    },

    destination_bank :{
        type: String,
        index: true,
        required: true,
    },

    recipient_name :{
        type: String,
        index: true,
        required: true,
    },

    amount :{
        type: Number,
        index: true,
        required: true,
    },

    total_fee :{
        type: Number,
        index: true,
        required: true,
    },

    status :{
        type: String,
        index: true,
        default:"POSTED",
    },
    remarks :{
        type: String,
        index: true,
        default:"",
    },
    receiptUrl: {
        type: String,
        index: true,
        default:""
    },
    transaction_date_and_time_no :{
        type: Date,
        index: true,
        required: true,
        default: () => new Date(),
    },

    dateCreated:{
        type: Date,
        index: true,
        default: () => new Date(),
    }
   
})

const TransactionReportModel = mongoose.model("transactionreportrecords", transactionReportSchema,{ collection: "transactionreportrecords" }.collection);

export default TransactionReportModel;