import mongoose from "mongoose"

const torSchema = new mongoose.Schema({
    coopId:{
        
        type: String,
        index:true,
        required: true,
    },
 UUID:{
    type: String,
    index: true,
    unique: true,
 },

 device_id:{
    type: String,
    index: true,
    default: ""
},

control_no:{
    type: String,
    index: true,
    default: ""
},

tor_no:{
    type: String,
    index: true,
    default: ""
},

baggage:{
    type: Number,
    index: true,
    required: true
},

subtotal:{

    type: Number,
    index: true,
    required: true
},

date_of_trip:{
    type: String,
    index: true,
    default:""
},

bus_no:{
    type: String,
    index: true,
    default: ""
},

discount:{
    type: Number,
    index: true,
    default:0.00
},  

route:{
    type:String,
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
    default: ""
},

trip_no:{
    type: Number,
    index: true,
    default:0
},

ticket_no:{
    type: String,
    index: true,
    unique: true,
},

ticket_type:{
    type:String,
    index: true,
    default:""
},

ticket_status:{
    type: String,
    index: true,
    default:""
},

timestamp:{
    type: Date,
    index: true,
    default: Date.now,
},

from_place:{
    type: String,
    index: true,
    default:""
},

to_place:{
    type: String,
    index: true,
    default:""
},

from_km:{
    type: Number,
    index: true,
    default: 0
},

to_km:{
    type: Number,
    index: true,
    default: 0
},

km_run:{
    type: Number,
    index: true,
    default: 0
},

fare:{
    type: Number,
    index: true,
    default: 0
},


additionalFare:{
    type: Number,
    index: true,
    default: 0
},

card_no:{
    type: String,
    index: true,
    default:""
},

status:{
    type: String,
    index: true,
    default:""
},

lat:{
    type:String,
    index: true,
    default:""
},

long:{
    type:String,
    index: true,
    default:""
},

created_on:{
    type: Date,
    index: true,
    default: () => new Date()
},

updated_on:{
    type: Date,
    index: true,
    default: () => new Date()
},

previous_balance:{
    type: Number,
    index: true,
    default:0
},

current_balance:{
    type: Number,
    index: true,
    default: 0
},

dateCreated:{
    type: Date,
    index: true,
    default: () => new Date(),
},


})

const TORTicketModel = mongoose.model('torticketrecords', torSchema,{collections :"torticketrecords"}.collections);
export default TORTicketModel;