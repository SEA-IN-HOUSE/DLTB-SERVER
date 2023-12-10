import TORTroubleRepository, { ITrouble } from "../repositories/TORTroubleRepository";


class TORTroubleServices{

    
  async GetAllTOR(){

        
    try{

    const allTOR = await TORTroubleRepository.GetAllTor();

    return {status: 0, message: "OK", response: allTOR}

    }catch(e){
        console.error("Error in tor services: "+e);
        return {status: 500, message: e, response: {}}
    }

}

async CreateTOR(tor : ITrouble){

    try{
        console.log(tor)
        const saveNewTor = await TORTroubleRepository.CreateTOR(tor)

        return {status: 0, message: "OK", response: saveNewTor}
      

    }catch(e){
        console.error("Error in tor services: "+e);
        return {status: 500, message: e, response: {}}
    }

}
async GetDataPerCoopId(coopId : string ){

    console.log(coopId)
    try{
        const data = await TORTroubleRepository.GetDataPerCoopId(coopId);

        
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


async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){

    try{

        const data = await TORTroubleRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

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

export default new TORTroubleServices();