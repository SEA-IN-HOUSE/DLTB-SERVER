import { ObjectId } from "mongodb";
import { IStation } from "../models/StationModel";
import StationRepository from "../repositories/StationRepository";

class StationService{

    async GetAllStation(){
    
        try{

            const stations = await StationRepository.GetAllStation();

         
                return {status: 0, message: "OK", response: stations}
           
            
        }catch(e){
            console.log(`Error in station services: ${e}`)
            return {status: 500, message: e, response: {}}
        }

    }

    async AddStation( newStation : IStation){
       
        try{
            const addNewStation = {...newStation , routeId : new ObjectId(newStation.routeId)}
            const addStation = await StationRepository.AddStation(newStation);

            return {status: 0, message: "OK", response: addStation}

        }catch(e){
            console.log(`Error in station services: ${e}`)
            return {status: 500, message: e, response: {}}
        }

    }

    async GetAllDataPerCoopId(coopId : string ){
        try{

            const data = await StationRepository.GetAllPerCoopId(coopId);

            return {status: 0, message: "OK", response: data}

        }catch(e){
            console.error("Error in services: "+e);
            return {status: 500, message: e, response: {}}
        }
    }
    
    async GetDataPerCoopIdAndRouteId(coopId : string, routeId: string){

        try{

            const data = await StationRepository.GetDataPerCoopIdAndRouteId(coopId, routeId)

            return {status: 0, message: "OK", response: data}

        }catch(e){
            console.error("Error in services: "+e);
            return {status: 500, message: e, response: {}}
        }

    }

    async UpdateRowNoById(id : string, newRowNo: number, coopId: string){
    
        try{

            const data = await StationRepository.UpdateRowNoById(id, newRowNo,coopId);

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Failed to update row no", response: {}}
            }

        }catch(e){
            console.log(`Error in services ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }
}

export default new StationService();