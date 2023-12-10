import mongoose from "mongoose";


const authorizationTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    }

});

const AuthorizationTokenModel = mongoose.model('authorizationtokenrecords', authorizationTokenSchema  ,{ collection: "authorizationtokenrecords" }.collection);

export default AuthorizationTokenModel;