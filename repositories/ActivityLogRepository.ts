import ActivityLogModel from "../models/ActivityLogModel";

class ActivityLogRepository{

    async GetDataByCoopID(coopId: string){

        try{

            const data = await ActivityLogModel.find({"coopId" : coopId})

            return data;

        }catch(e){
            return null;
        }
        
    }
 
    async AddData(data : any){
        
        try{

            const newData = new ActivityLogModel(data)

            return await newData.save();

        }catch(e){
            return null;
        }
    }
}

export default new ActivityLogRepository()