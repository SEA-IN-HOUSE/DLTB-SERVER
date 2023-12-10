import DeviceModel, { IDevice } from "../models/DeviceModel";

class DeviceRepository{

    async GetAllData(){

        try{

            const data = DeviceModel.find({});

            return data;

        }catch(e){
            console.error("Error in direction repository: "+e)
            return false;
        }

    }

    async AddData(data : IDevice){

        try{

            const newData = new DeviceModel(data);

            return await newData.save();

        }catch(e){
            console.error("Error in direction repository: "+e)
            return false;
        }

    }

    async GetCoopIdPerDeviceId(coopId : string){
        
        try{

            const findCoopId : any = await DeviceModel.find({"coopId" : coopId})

            return findCoopId;

        }catch(e){
            console.error(`Error in repository ${e}`);
            return "";
        }

    }

    async GetDataPerDeviceId(deviceId : string){
        
        try{

            const findCoopId : any = await DeviceModel.findOne({"deviceId" : deviceId})

            console.log(findCoopId)

            return findCoopId;

        }catch(e){
            console.error(`Error in repository ${e}`);
            return null;
        }

    }

}

export default new DeviceRepository();