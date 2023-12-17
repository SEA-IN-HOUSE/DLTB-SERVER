import axios from "axios";
import TORTicketRepository from "../repositories/TORTicketRepository";
import TORTicketModel from "../models/TORTicketModel";
import ActivityLogService from "./ActivityLogService";
import { IActivityLog } from "../models/ActivityLogModel";



interface ITORTicket{

    portalData: [],
    recordId: string,
    modId: string,
    
    fieldData : ITicket
    
}

interface ITicket {
    coopId: string,
    UUID: string,
    device_id: string,
    control_no : string,
    tor_no: string,
    date_of_trip: string,
    bus_no: string,
    route: string,
    route_code: string,
    bound: string,
    trip_no: number,
    ticket_no: string,
    ticket_type: string,
    ticket_status: string,
    timestamp: Date,
    from_place: string,
    to_place: string,
    from_km: number,
    to_km: number,
    km_run: number,
    fare: number,
    card_no: string,
    status: string,
    lat: string,
    long: string,
    created_on: Date,
    updated_on: Date,
    previous_balance: number,
    current_balance: number
}
class TORTicketServices{

    async GetAllTORTicketService(){

        try{

            const data = await TORTicketRepository.GetAllTORTicket();

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


    async FilterGetDataPerCoopId(coopId: string, fromDate: string, toDate: string, filterType: string, filterData: any) {
        try {
         
            const data = await TORTicketRepository.FilterGetDataPerCoopId(coopId, fromDate, toDate, filterType, filterData);

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


    async GetDataPerCoopId(coopId : string){
        try{

            const data = await TORTicketRepository.GetDataPerCoopId(coopId);

            
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

    async SyncGetAllTORTicketService(){ 

        try{
            
            const token = await this.GenerateSession();

            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }
    
            
            const bodyParameters = {
                "query": [{"bound" : "SOUTH"}, {"bound" : "NORTH"}]
            }
    
            const requestTORTicketFromOtherServer = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_tickets/_find", bodyParameters, config);

            const responseTORTicketFromOtherServer = await requestTORTicketFromOtherServer.data;

            const destroyToken = await this.EndSession(token);

            console.log(responseTORTicketFromOtherServer.response.data)

            responseTORTicketFromOtherServer.response.data.map(async (torTicket : ITORTicket) =>{
               
                    await this.FindAndReplaceTORTicketServices(torTicket);
                
            })

            return responseTORTicketFromOtherServer;

        }catch(e){
            console.error("Error in syncing all tor ticket services: "+e);
            return false;
        }

    }

    async SyncTORTicketService(){

        try{

            // const torTickets = await this.GetAllTORTicketService();

            // if(torTickets !== false){
            
            //     const insertTorTickets = await torTickets?.map(async (torTicket : any) =>{

            //         await this.CreateTORTicketServices(torTicket);

            //     })
            // }

            
            // const token = await this.GenerateSession();

            // const torTickets = await this.GetAllTORTicketService();

            // console.log(torTickets)

            // const deleteToke = await this.EndSession(token);
            return {status: 0, message: ""};
        }catch(e){

            console.error("Error in syncing tor ticket service: "+e);
            return {status: 1, message: ""+e};

        }

    }

    async  InsertTORTickeToOurDBServices(torTicket : ITicket ){

        try{


            const newact = {
                "userId":"655321a339c1307c069616e9",
                "coopId" : "655321a339c1307c069616e9",
                "action"  : "POST",
                "actionDescription" : "Created new tor ticket"
            }
          
            await ActivityLogService.AddData(newact)

            const saveTicket = await TORTicketRepository.CreateTORTicket(torTicket);
            if(saveTicket !== null){
                return {status: 0, message: "OK", response: saveTicket};
            }else{
                return {status: 1, message: "Invalid fields", response: saveTicket};
            }
           

        }catch(e){
            console.error("Error in inserting ticket in database service"+e);
            return {status: 500, message: "Internal server error", response: e};
        }
        
    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){
        try{

            const data = await TORTicketRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

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


    async FindOneAndUpdateAdditionalFareAndCurrentBalance(additionalFare : number , currentBalance : number, previousBalance: number, ticketNo : string) {
        try {
            const data = await TORTicketRepository.FindOneAndUpdateAdditionalFareAndCurrentBalance(additionalFare, currentBalance, previousBalance, ticketNo)

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Fields", response: {}}
            }return false;
            
        } catch (e) {
            console.error("Error in services:", e);
            return false;
        }
    }

    async FindOneAndReplacePerTicketNo(ticketNo : string, torTicket : any){
     
        try{

            const data = await TORTicketRepository.FindOneAndReplacePerTicketNo(ticketNo, torTicket)

            if(data !== null){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Fields", response: {}}
            }

        }catch(e){
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
        
    }

    async FindDataByTicketNo(ticketNo : string){
     
        try{
            console.log(`TICKET NUMBER FROM SERVICE ${ticketNo}`)
            const data = await TORTicketRepository.FindDataByTicketNo(ticketNo)
            console.log(`TICKET NO DATA ${data}`)
            if(Object(data).length > 0){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Fields", response: {}}
            }

        }catch(e){
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
        
    }


    async FindAndReplaceTORTicketServices(torTicket : ITORTicket){

        try{

          const replaceTicket = await TORTicketRepository.FindOneAndReplaceTORTicket(torTicket);

          return true;

        }catch(e){
            console.error("Error in find and replace tor ticket service: "+e);
            return false;
        }

    }
    

    async CheckIfUUIDExistService(UUID: string){
        
        try{

            const token = await this.GenerateSession();


            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }

            const bodyParameters = {
                "query": [{"UUID" : UUID}]
            }

            console.log(bodyParameters)

            const request = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_tickets/_find", bodyParameters, config);

            console.log(request)

            const destroyToken = await this.EndSession(token);

            

            if(request.data.messages.code === "401"){
                
                return {status: 0}

            }else{
                return {status: 1}
            }

        }catch(e){
            console.error("Error in check uuid: "+e);
            return {status: 500};
        }
        
    }

    async CreateTORTicketServices(torTicket : any){

        try{

            let torTemp = JSON.parse(JSON.stringify(torTicket.fieldData[0]));
            delete torTemp._id;
            console.log("NEW TOR")
            console.log(torTemp)
            const newTor = {
              "fieldData": torTemp
            }
          
            console.log(newTor)

                const token = await this.GenerateSession();

                const config = {
                    headers :{
                        Authorization : `Bearer ${token}`
                    }
                }
           
                const requestCreateNewTORTicket = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_tickets/records", newTor, config);
    
                const responseTORTicketFromOtherServer = await requestCreateNewTORTicket.data;
    
                const destroyToken = await this.EndSession(token);
    
                return {status: 0, message: "OK"};

           

        }catch(e){
            console.error("Error in creating new tor ticket service: "+e);
            return {status: 500, message: e};
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

            const data = await TORTicketRepository.GetDataIsNotUploaded(coopId);

            
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

                     // "fieldData": {
                //     "UUID": "ab91cc01-0059-47db-9ad5-a9066ceabcdc",
                //     "device_id": "ab35271806004852",
                //     "control_no": "23605142020000002",
                //     "tor_no": "236-200514-1144",
                //     "date_of_trip": "05/14/2020",
                //     "bus_no": "236",
                //     "route": "LRT-CALATAGAN",
                //     "route_code": "CLT",
                //     "bound": "SOUTH",
                //     "trip_no": 5,
                //     "ticket_no": "236012820204852000104",
                //     "ticket_type": "S",
                //     "ticket_status": "",
                //     "timestamp": "2020-01-28 12:23:33.000000",
                //     "from_place": "LRT TAFT BUENDIA",
                //     "to_place": "CALATAGAN",
                //     "from_km": 5,
                //     "to_km": 125,
                //     "km_run": 120,
                //     "fare": 168.0,
                //     "card_no": "3125100907434410",
                //     "status": "",
                //     "lat": "14.076688",
                //     "long": "120.866036",
                //     "created_on": "2019-12-23 09:05:35.000000",
                //     "updated_on": "2019-12-23 09:05:35.000000",
                //     "previous_balance": "240.00",
                //     "current_balance": "84.00"
                // }

    

                    const bodyParameters : any = {
                        fieldData:{
                            "UUID": tor.UUID,
                            "device_id": tor.device_id,
                            "control_no": tor.control_no,
                            "tor_no": tor.tor_no,
                            "date_of_trip":tor.date_of_trip,
                            "bus_no": tor.bus_no,
                            "route": tor.route,
                            "route_code": tor.route_code,
                            "bound": tor.bound,
                            "trip_no": tor.trip_no,
                            "ticket_no": tor.ticket_no,
                            "ticket_type": tor.ticket_type,
                            "ticket_status": tor.ticket_status,
                            "timestamp": tor.timestamp,
                            "from_place": tor.from_place,
                            "to_place": tor.to_place,
                            "from_km": tor.from_km,
                            "to_km": tor.to_km,
                            "km_run": tor.km_run,
                            "fare": tor.fare,
                            "card_no": tor.card_no,
                            "status": tor.status,
                            "lat": tor.lat,
                            "long": tor.long,
                            "created_on": tor.created_on,
                            "updated_on": tor.updated_on,
                            "previous_balance": tor.previous_balance,
                            "current_balance": tor.current_balance
                        }
                    };
            
                    const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_tickets/records`, bodyParameters, config);

                    
                    
                } catch (e) {
                    console.log(`Error in inserting tor ${e}`);
                }
                const updateStatusOfTor = await TORTicketRepository.UpdateIsUploaded(tor.id, true);
            });

            const deleteToken = await this.EndSession(token);

            return {status: 0, message: "OK", response: deleteToken}
        }catch(e){
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }


}

export default new TORTicketServices();