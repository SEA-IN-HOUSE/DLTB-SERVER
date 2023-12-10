

// _id, deviceid, coopid

import mongoose, {Document} from "mongoose";

export interface IDevice extends Document{

    deviceId : string,
    coopId: string,
    deviceName: string,
    deviceType: string,
}

const deviceSchema = new mongoose.Schema({
    deviceId :{
        // type: mongoose.Schema.Types.ObjectId,
        type : String,
        required: true,
        unique: true,
    },

    coopId :{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
    },

    deviceName:{
        type: String,
        required: true,
    },

    deviceType:{
        type: String,
        required: true,
    },

    dateCreated:{
        type: Date,
        default: new Date(),
        index: true,
    }

})

const DeviceModel = mongoose.model("DeviceRecords", deviceSchema);

export default DeviceModel;
