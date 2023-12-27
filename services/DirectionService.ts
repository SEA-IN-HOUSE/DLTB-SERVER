import { directionRepo } from "../repositories/DirectionRepository";

class DirectionService{

    async FilterGetDataPerCoopId(coopId: string, fromDate: string, toDate: string, filterType: string, filterData: any) {
        try {
         
            const data = await directionRepo.FilterGetDataPerCoopId(coopId, fromDate, toDate, filterType, filterData);

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }

        } catch (e) {
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }

    
    async UpdateById(id : string , newData : any){
        try{

           const data = await directionRepo.UpdateById(id, newData)

           if(data === true){
            return {status: 0, message: "OK", response: data}
           }else{
            return {status: 1, message: "Invalid Fields", response: data}
           }


        }catch(e){
            console.error("Error in services: "+e);
            return {status: 500, message: e, response: {}}
        }
    }

    async DeleteById(id : string){
        try{

           const data = await directionRepo.DeleteById(id)

           if(data === true){
            return {status: 0, message: "OK", response: data}
           }else{
            return {status: 1, message: "Invalid Fields", response: data}
           }


        }catch(e){
            console.error("Error in services: "+e);
            return {status: 500, message: e, response: {}}
        }
    }
    

}

export default new DirectionService();