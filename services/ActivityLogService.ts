import { IActivityLog } from "../models/ActivityLogModel";
import ActivityLogRepository from "../repositories/ActivityLogRepository";

class ActivityLogService{

    async GetDataPerCoopId(coopId : string){

        try{
            const data = await ActivityLogRepository.GetDataByCoopID(coopId)

           
                return {status: 0, message: "OK", response: data}
            

            
        }catch(e){
            return {status: 500, message: "Invalid Coop Id", response: {}}
        }

    }


    async AddData(newData : any  ){

          
        try{
            const data = await ActivityLogRepository.AddData(newData)
           
                return {status: 0, message: "OK", response: data}
            

            
        }catch(e){
            return {status: 500, message: "Invalid Coop Id", response: {}}
        }

    }

}

export default new ActivityLogService();