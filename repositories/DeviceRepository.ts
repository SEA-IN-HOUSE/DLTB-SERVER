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

    async FilterGetDataPerCoopId(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
        try {
            let query: any = {
                coopId: coopId,
            };

    
            if (fromDate !== null && toDate !== null) {
                query.dateCreated = {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate),
                };
            }
    
            if (filterType !== null && filterData !== null && filterType !== "None" && filterData !== "") {
                query[filterType] = filterData;
            }
    
            const data = await DeviceModel.find(query);
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }
    

}

export default new DeviceRepository();