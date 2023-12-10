import TORInspectionModel from "../models/TORInspectionModel";
import TORInspectionRepository, { IInspection } from "../repositories/TORInspectionRepository";

class TORInspectionService{

    async GetAllTORInspection(){

        
        try{

        const allTORInspection = await TORInspectionRepository.GetAllTORInspection();

        return {status: 0, message: "OK", response: allTORInspection}

        }catch(e){
            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}
        }

    }

    async CreateTORInspection(torInspection : any){

        try{
            console.log("service")
            console.log(torInspection)
            const saveNewTorInspection = await TORInspectionRepository.CreateTORInspection(torInspection.fieldData);

            return {status: 0, message: "OK", response: saveNewTorInspection}
          

        }catch(e){
            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}
        }

    }


    async GetDataPerCoopId(coopId: string){
        try{

            const data = await TORInspectionRepository.GetDataPerCoopId(coopId);

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }
        }catch(e){
            console.log(`Error in services ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }



    async  FilterDataPerCoopIdAndDate(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
        try{

            const data = await TORInspectionRepository.FilterDataPerCoopIdAndDate(coopId, fromDate, toDate, filterType, filterData);

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Fields", response: {}}
            }
        }catch(e){
            console.log(`Error in services ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }

}

export default new TORInspectionService();