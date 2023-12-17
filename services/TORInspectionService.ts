import TORInspectionModel from "../models/TORInspectionModel";
import TORInspectionRepository, { IInspection } from "../repositories/TORInspectionRepository";
import axios from "axios";
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
    
                const data = await TORInspectionRepository.GetDataIsNotUploaded(coopId);
    
                
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
                        //     "offboard_time": "2019-12-23 09:04:00.000000",
                        //     "offboard_place": "",
                        //     "offboard_km_post": "",
                        //     "ticket_no_beginning": "251122320194845000001",
                        //     "ticket_no_ending": "251122320194845000047",
                        //     "passenger_count_paid": "",
                        //     "passenger_count_with_pass": "",
                        //     "passenger_count_transfer": "",
                        //     "passenger_count_total": 45,
                        //     "actual_count": 45,
                        //     "total_discrepancy": 0,
                        //     "remarks": "15 pax",
                        //     "timestamp": "2019-12-23 09:05:35.000000",
                        //     "lat": "14.076688",
                        //     "long": "120.866036"
                        // }
                        
                        console.log(`TOR ${tor.fieldData}`)
    
                        const bodyParameters : any = {
                            fieldData:{
                                "UUID":tor.fieldData.UUID,
                                "device_id":tor.fieldData.device_id,
                                "control_no":tor.fieldData.control_no,
                                "tor_no":tor.fieldData.tor_no,
                                "date_of_trip":tor.fieldData.date_of_trip,
                                "bus_no":tor.fieldData.bus_no,
                                "route":tor.fieldData.route,
                                "route_code":tor.fieldData.route_code,
                                "bound":tor.fieldData.bound,
                                "trip_no":tor.fieldData.trip_no,
                                "inspector_emp_no":tor.fieldData.inspector_emp_no,
                                "inspector_emp_name":tor.fieldData.inspector_emp_name,
                                "onboard_time":tor.fieldData.onboard_time,
                                "onboard_place":tor.fieldData.onboard_place,
                                "onboard_km_post":tor.fieldData.onboard_km_post,
                                "offboard_time":tor.fieldData.offboard_time,
                                "offboard_place":tor.fieldData.offboard_place,
                                "offboard_km_post":tor.fieldData.offboard_km_post,
                                "ticket_no_beginning":tor.fieldData.ticket_no_beginning,
                                "ticket_no_ending":tor.fieldData.ticket_no_ending,
                                "passenger_count_paid":tor.fieldData.passenger_count_paid,
                                "passenger_count_with_pass":tor.fieldData.passenger_count_with_pass,
                                "passenger_count_transfer":tor.fieldData.passenger_count_transfer,
                                "passenger_count_total":tor.fieldData.passenger_count_total,
                                "actual_count":tor.fieldData.actual_count,
                                "total_discrepancy":tor.fieldData.total_discrepancy,
                                "remarks":tor.fieldData.remarks,
                                "timestamp":tor.fieldData.timestamp,
                                "lat":tor.fieldData.lat,
                                "long":tor.fieldData.long
                            }
                        };
                
                        const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_inspections/records`, bodyParameters, config);
    
                        
                        
                    } catch (e) {
                        console.log(`Error in inserting tor ${e}`);
                    }
                    console.log(`TOR ID: ${tor.fieldData.id}`)
                    const updateStatusOfTor = await TORInspectionRepository.UpdateIsUploaded(tor.fieldData.id, true);
                });
    
                const deleteToken = await this.EndSession(token);
    
                return {status: 0, message: "OK", response: deleteToken}
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
    
        }

}

export default new TORInspectionService();