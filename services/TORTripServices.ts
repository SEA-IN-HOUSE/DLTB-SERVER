import TORTripRepository, { ITrip } from "../repositories/TORTripRepository";

class TORTripServices{

    async AddNewTORTrip(tor : ITrip){

        try{
            console.log(tor)
            const newTORTrip = await TORTripRepository.AddNewTORTrip(tor);

            return {status: 0, message: "OK", response: newTORTrip}

        }catch(e){
            console.error("Error in trip services: "+e);
            return {status: 500, message: e};
        }

    }

    async GetAllTORTrip(){

        try{

            const allTorTrip = await TORTripRepository.GetAllTORTrip();

            return {status: 0, message: "OK", response: allTorTrip};

        }catch(e){
            console.error("Error in trip services: "+e);
            return {status: 500, message: e};
        }

    }

    async GetDataPerCoopId(coopId : string ){

        console.log(coopId)
        try{
            const data = await TORTripRepository.GetDataPerCoopId(coopId);

            
            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }
            
        }catch(e){
            console.log(`Error in services ${e}`)
            return {status: 500, message: e, response: {}}
        }
    }

    async UpdateDataPerControlNo(controlNo : string , newData : ITrip){
        
        try{

            const data = await TORTripRepository.UpdateDataPerControlNo(controlNo, newData);

            if(Object(data).length > 0 || data !== null){

                return {status: 0, message: "OK", response: data}

            }else{

                return {status: 0, message: "OK", response: {}}

            }

        }catch(e){

            console.log(`Error in services ${e}`)
            return {status: 500, message: `Internal Server Error : ${e}`, response: {}}

        }

    }

    async FilterGetDataPerCoopId(coopId: string, fromDate: string, toDate: string, filterType: string, filterData: any) {
        try {
         
            const data = await TORTripRepository.FilterTripDataPerCoopId(coopId, fromDate, toDate, filterType, filterData);

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Fields", response: {}}
            }

        } catch (e) {
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }


    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){
        try{

            const data = await TORTripRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }

        }catch(e){
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }

}

export default new TORTripServices();