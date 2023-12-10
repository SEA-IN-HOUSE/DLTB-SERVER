import VehicleRepository, { IVehicle } from "../repositories/VehicleRepository"


class VehicleServices {

    async GetAllVehicle (){

        try{

            const allVehicles = await VehicleRepository.GetAllVehicles();

            return {status: 0, message: "OK", response: allVehicles}
        }catch(e){

            console.log(`Error in getting vehicle services: ${e}`)

            return {status: 500, message: e, response: {}}

        }
        
    }

    async GetAllVehiclePerCoopId(coopId : string){
        try{

            const allVehicles = await VehicleRepository.GetAllDataPerCoopId(coopId);

            if(Object(allVehicles).length > 0){
                return {status: 0, message: "OK", response: allVehicles}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }

           
        }catch(e){

            console.log(`Error in getting vehicle services: ${e}`)

            return {status: 500, message: e, response: {}}

        }
    }

    async AddVehicle ( vehicle : IVehicle){

        try{

            const saveVehicle : any = await VehicleRepository.AddVehicle(vehicle);

            console.log(saveVehicle?.MongoServerError)
           if(saveVehicle?.MongoServerError){
            return {status: 1, message: "Invalid fields", response: {}}
           }
            if(saveVehicle === null){
                return {status: 1, message: "Invalid fields", response: {}}
            }else{
                return {status: 0, message: "OK", response: {}}
            }
            
        }catch(e){
            console.log(`Error in adding vehicle: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }

}

export default new VehicleServices();