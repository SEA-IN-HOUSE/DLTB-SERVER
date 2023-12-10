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
}

export default new StationService();