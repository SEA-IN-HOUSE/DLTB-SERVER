
import mongoose from "mongoose";

export interface IAdminPage extends mongoose.Document {

    pageName : string,

    pageUrl : string,

    createdAt : Date,

    updatedAt : Date,

}

const adminPageSchema = new mongoose.Schema({

    pageName : {
        type : String,
        required : true,
        index : true
    },

    pageUrl : {
        type : String,
        required : true,
        index : true
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },

    updatedAt : {
        type : Date,
        default : Date.now()
    }

});

const AdminPageModel = mongoose.model("adminpagerecords", adminPageSchema, { collection: "adminpagerecords" }.collection);

export default AdminPageModel;