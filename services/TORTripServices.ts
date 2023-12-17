import TORTripRepository, { ITrip } from "../repositories/TORTripRepository";
import axios from "axios";
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
    
                const data = await TORTripRepository.GetDataIsNotUploaded(coopId);
    
                
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
                        //     "UUID": "abfd56aa-7773-4e99-97ac-82d60e9abcde",
                        //     "device_id": "ab35271806004852",
                        //     "control_no": "23605142020000002",
                        //     "tor_no": "236-200514-1043",
                        //     "date_of_trip": "05/14/2020",
                        //     "bus_no": "236",
                        //     "route": "PITX-NASUGBU",
                        //     "route_code": "NAS",
                        //     "bound": "SOUTH",
                        //     "trip_no": 1,
                        //     "departed_place": "",
                        //     "departed_time": "2020-01-28 11:44:38.000000",
                        //     "departed_dispatcher_id": "TESTDISPATCHER-001",
                        //     "departed_dispatcher": "DISPATCHER, TEST DLTB TEST",
                        //     "arrived_place": "",
                        //     "arrived_time": "2020-01-28 11:51:20.000000",
                        //     "arrived_dispatcher_id": "TESTDISPATCHER-001",
                        //     "arrived_dispatcher": "DISPATCHER, TEST DLTB TEST",
                        //     "from_km": 0,
                        //     "to_km": 0,
                        //     "km_run": 97.0,
                        //     "ticket_revenue_atm": 2270.0,
                        //     "ticket_count_atm": 520.0,
                        //     "ticket_revenue_atm_passenger": 2270.0,
                        //     "ticket_revenue_atm_baggage": 0.0,
                        //     "ticket_count_atm_passenger": 520.0,
                        //     "ticket_count_atm_baggage": 0.0,
                        //     "ticket_revenue_punch": 5000,
                        //     "ticket_count_punch": 20,
                        //     "ticket_revenue_punch_passenger": 2000,
                        //     "ticket_revenue_punch_baggage": 3000,
                        //     "ticket_count_punch_passenger": 10,
                        //     "ticket_count_punch_baggage": 10,
                        //     "ticket_revenue_charter": 0,
                        //     "ticket_count_charter": 0,
                        //     "ticket_revenue_waybill": 100,
                        //     "ticket_count_waybill": 0,
                        //     "ticket_amount_cancelled": 0,
                        //     "ticket_count_cancelled": 0,
                        //     "ticket_amount_passes": "",
                        //     "ticket_count_passes": "",
                        //     "passenger_revenue": 4270.0,
                        //     "baggage_revenue": 3100.0,
                        //     "gross_revenue": 7370.0,
                        //     "passenger_count": 530.0,
                        //     "baggage_count": 10.0,
                        //     "departure_timestamp": "2020-01-28 11:44:38",
                        //     "departure_lat": "14.510033",
                        //     "departure_long": "120.991138",
                        //     "arrival_timestamp": "2020-01-28 14:30:25",
                        //     "arrival_lat": "14.069637",
                        //     "arrival_long": "120.632632"
                        // }
                        
                        console.log(`TOR ${tor}`)
    
                        const bodyParameters : any = {
                            fieldData:{
                                "UUID":tor.fieldData[0].UUID,
                                "device_id":tor.fieldData[0].device_id,
                                "control_no":tor.fieldData[0].control_no,
                                "tor_no":tor.fieldData[0].tor_no,
                                "date_of_trip":tor.fieldData[0].date_of_trip,
                                "bus_no":tor.fieldData[0].bus_no,
                                "route":tor.fieldData[0].route,
                                "route_code":tor.fieldData[0].route_code,
                                "bound":tor.fieldData[0].bound,
                                "trip_no":tor.fieldData[0].trip_no,
                                "departed_place":tor.fieldData[0].departed_place,
                                "departed_time":tor.fieldData[0].departed_time,
                                "departed_dispatcher_id":tor.fieldData[0].departed_dispatcher_id,
                                "departed_dispatcher":tor.fieldData[0].departed_dispatcher,
                                "arrived_place":tor.fieldData[0].arrived_place,
                                "arrived_time":tor.fieldData[0].arrived_time,
                                "arrived_dispatcher_id":tor.fieldData[0].arrived_dispatcher_id,
                                "arrived_dispatcher":tor.fieldData[0].arrived_dispatcher,
                                "from_km":tor.fieldData[0].from_km,
                                "to_km":tor.fieldData[0].to_km,
                                "km_run":tor.fieldData[0].km_run,
                                "ticket_revenue_atm":tor.fieldData[0].ticket_revenue_atm,
                                "ticket_count_atm":tor.fieldData[0].ticket_count_atm,
                                "ticket_revenue_atm_passenger":tor.fieldData[0].ticket_revenue_atm_passenger,
                                "ticket_revenue_atm_baggage":tor.fieldData[0].ticket_revenue_atm_baggage,
                                "ticket_count_atm_passenger":tor.fieldData[0].ticket_count_atm_passenger,
                                "ticket_count_atm_baggage":tor.fieldData[0].ticket_count_atm_baggage,
                                "ticket_revenue_punch":tor.fieldData[0].ticket_revenue_punch,
                                "ticket_count_punch":tor.fieldData[0].ticket_count_punch,
                                "ticket_revenue_punch_passenger":tor.fieldData[0].ticket_revenue_punch_passenger,
                                "ticket_revenue_punch_baggage":tor.fieldData[0].ticket_revenue_punch_baggage,
                                "ticket_count_punch_passenger":tor.fieldData[0].ticket_count_punch_passenger,
                                "ticket_count_punch_baggage":tor.fieldData[0].ticket_count_punch_baggage,
                                "ticket_revenue_charter":tor.fieldData[0].ticket_revenue_charter,
                                "ticket_count_charter":tor.fieldData[0].ticket_count_charter,
                                "ticket_revenue_waybill":tor.fieldData[0].ticket_revenue_waybill,
                                "ticket_count_waybill":tor.fieldData[0].ticket_count_waybill,
                                "ticket_amount_cancelled":tor.fieldData[0].ticket_amount_cancelled,
                                "ticket_count_cancelled":tor.fieldData[0].ticket_count_cancelled,
                                "ticket_amount_passes":tor.fieldData[0].ticket_amount_passes,
                                "ticket_count_passes":tor.fieldData[0].ticket_count_passes,
                                "passenger_revenue":tor.fieldData[0].passenger_revenue,
                                "baggage_revenue":tor.fieldData[0].baggage_revenue,
                                "gross_revenue":tor.fieldData[0].gross_revenue,
                                "passenger_count":tor.fieldData[0].passenger_count,
                                "baggage_count":tor.fieldData[0].baggage_count,
                                "departure_timestamp":tor.fieldData[0].departure_timestamp,
                                "departure_lat":tor.fieldData[0].departure_lat,
                                "departure_long":tor.fieldData[0].departure_long,
                                "arrival_timestamp":tor.fieldData[0].arrival_timestamp,
                                "arrival_lat":tor.fieldData[0].arrival_lat,
                                "arrival_long":tor.fieldData[0].arrival_long
                            }
                        };
                
                        const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_trips/records`, bodyParameters, config);
    
                        
                        
                    } catch (e) {
                        console.log(`Error in inserting tor ${e}`);
                    }
                    console.log(`TOR ID: ${tor.fieldData[0].id}`)
                    const updateStatusOfTor = await TORTripRepository.UpdateIsUploaded(tor.fieldData[0].id, true);
                });
    
                const deleteToken = await this.EndSession(token);
    
                return {status: 0, message: "OK", response: deleteToken}
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
    
        }

}

export default new TORTripServices();