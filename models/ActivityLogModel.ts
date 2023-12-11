
// userId
// "656519772c8688e81d2ebc1e"
// coopId
// "655321a339c1307c069616e9"
// action
// "POST"
// actionDescription
// "Create new tor ticket"
// dataCreated
// 2023-12-01T14:07:37.016+00:00



import mongoose from "mongoose";

export interface IActivityLog extends mongoose.Document {

    userId : string,

    coopId : string,

    action : string,

    actionDescription : string,
    
}

const adminPageSchema = new mongoose.Schema({

    userId : {
        type : String,
        required : true,
        index : true
    },

    coopId : {
        type : String,
        required : true,
        index : true
    },

    action :{
        type : String,
        required: true,
        index: true
    },

    actionDescription:{
        type: String,
        required: true,
        index: true
    },

    dateCreated:{
        type: Date,
        default: () => new Date(),
        index: true,
    }

});

const ActivityLogModel = mongoose.model("activitylogsrecords", adminPageSchema, { collection: "activitylogsrecords" }.collection);

export default ActivityLogModel;