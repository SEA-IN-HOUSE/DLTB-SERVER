import TORTroubleRepository, { ITrouble } from "../repositories/TORTroubleRepository";

import axios from "axios";
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




    /////////////////////////////////////
 
    async GenerateSession(){
        
        let usernameCred = "filipay";
        let passwordCred ="";
    
        // if(process.env.USERNAME){
        //     usernameCred = process.env.USERNAME;
        // }
    
        if(process.env.PASSWORD){
            passwordCred = process.env.PASSWORD;
        }
        
        console.log("Username credentials " + usernameCred);
    
        console.log("Password credential " + passwordCred);
    
            try{
                
                const generateSession = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/sessions/", {},{
                    auth: {
                        username: usernameCred,
                        password: passwordCred,
                    }
                })
    
                const token = await generateSession.data.response.token;
    
                return token
            }catch(e){
                console.error("Error in generating session token " + e)
                return false
            }
        }
    
        async EndSession( token: string | boolean ){
    
            try{
    
                const endSession = await axios.delete("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/sessions/"+token);
    
                const response = await endSession.data;
           
                if(response.messages.code === "0"){
                    return true;
                }else{
                    return false;
                }
        
    
            }catch(e){
                console.error("Error in endsession service: "+e);
                return false;
            }
    
        }
    
        async SyncDataByCoopid(coopId: string){
    
            console.log(`Coop id: ${coopId}`)
            try{
    
                const data = await TORTroubleRepository.GetDataIsNotUploaded(coopId);
    
                
                console.log(`TORS : ${data}`)
    
                if(data !== null){
    
                    const insertTor = await this.InsertToFileMaker(data);
    
                    if(insertTor.status === 0){
                        return {status: 0, message: "OK", response: data}
                    }else{
                        return {status: 1, message: "Invalid UUID", response: {}} 
                    }
                }else{
                    return {status: 1, message: "Invalid UUID", response: {}}
                }
    
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
        }
    

  // DLTB_API_CREATE_TOR
  async InsertToFileMaker(tors : any){
            
    try{

        const token = await this.GenerateSession();

        console.log(`TOKEN: ${token}`)
    
        const config = {
            headers :{
                Authorization : `Bearer ${token}`
            }
        }

        tors.map(async (tor: any) => {

           


            try {
                // {
                //     "UUID": "ab91cc01-0059-47db-9ad5-a9066ceabcde",
                //     "device_id": "ab35271806004845",
                //     "control_no": "25105142020000001",
                //     "tor_no": "251-200514-0856",
                //     "date_of_trip": "05/14/2020",
                //     "bus_no": "251",
                //     "route": "NASUGBU-LRT",
                //     "route_code": "NAS",
                //     "bound": "NORTH",
                //     "trip_no": 1,
                //     "inspector_emp_no": "0008",
                //     "inspector_emp_name": "ADMIN, DLTB - ",
                //     "onboard_time": "2019-12-23 09:04:00.000000",
                //     "onboard_place": "BUCK STATE/ ROYALE TAGAYTAY",
                //     "onboard_km_post": 68,
                //     "trouble_description": "AIRCON TROUBLE",
                //     "timestamp": "2019-12-23 09:05:35.000000",
                //     "lat": "14.076688",
                //     "long": "120.866036"
                // }
                
                console.log(`TOR ${tor}`)

                const bodyParameters : any = {
                    fieldData:{
                        "UUID": tor.fieldData[0].UUID,
                        "device_id": tor.fieldData[0].device_id,
                        "control_no": tor.fieldData[0].control_no,
                        "tor_no": tor.fieldData[0].tor_no,
                        "date_of_trip": tor.fieldData[0].date_of_trip,
                        "bus_no": tor.fieldData[0].bus_no,
                        "route": tor.fieldData[0].route,
                        "route_code": tor.fieldData[0].route_code,
                        "bound": tor.fieldData[0].bound,
                        "trip_no": tor.fieldData[0].trip_no,
                        "inspector_emp_no": tor.fieldData[0].inspector_emp_no,
                        "inspector_emp_name": tor.fieldData[0].inspector_emp_name,
                        "onboard_time": tor.fieldData[0].onboard_time,
                        "onboard_place": tor.fieldData[0].onboard_place,
                        "onboard_km_post": tor.fieldData[0].onboard_km_post,
                        "trouble_description": tor.fieldData[0].trouble_description,
                        "timestamp": tor.fieldData[0].timestamp,
                        "lat": tor.fieldData[0].lat,
                        "long": tor.fieldData[0].long
                    }
                };
        
                const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_trouble/records`, bodyParameters, config);

                
                
            } catch (e) {
                console.log(`Error in inserting tor ${e}`);
            }
            console.log(`TOR ID: ${tor.fieldData[0].id}`)
            const updateStatusOfTor = await TORTroubleRepository.UpdateIsUploaded(tor.fieldData[0].id, true);
        });

        const deleteToken = await this.EndSession(token);

        return {status: 0, message: "OK", response: deleteToken}
    }catch(e){
        console.error(`Error in services: ${e}`);
        return {status: 500, message: e, response: {}}
    }

}

}

export default new TORTroubleServices();