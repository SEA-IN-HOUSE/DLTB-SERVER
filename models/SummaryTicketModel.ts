import mongoose from "mongoose";

export interface ISummaryTicket{

    tor_no: string

    reference_no: string,

    bus_unit: string,

    trip: number,

    route: string,

    no_of_passenger: number,

    no_of_baggage: number,

    cash_collection: number,

    date: Date,



}

const summaryTicketModel = new mongoose.Schema({
    tor_no:{
        type: String,
        index: true,
        required: true
    },
    reference_no :{
        type: String,
        index: true,
        required: true,
    },

    bus_unit :{
        type: String,
        index: true,
        required: true,
    },
    
    trip :{
        type: Number,
        index: true,
        required: true,
    },

    route :{
        type: String,
        index: true,
        required: true,
    },

    no_of_passenger :{
        type: Number,
        index: true,
        required: true,
    },

    no_of_baggage :{
        type: Number,
        index: true,
        required: true,
    },

    cash_collection :{
        type: Number,
        index: true,
        required: true,
    },

    date :{
        type: Date,
        index: true,
        required: true,
    },


    dateCreated:{
        type: Date,
        index: true,
        default: () => new Date(),
    }
})

const SummaryTicketModel = mongoose.model("summaryticketsrecords", summaryTicketModel,{ collection: "summaryticketsrecords" }.collection);

export default SummaryTicketModel;