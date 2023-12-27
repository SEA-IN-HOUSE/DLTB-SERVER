import axios from "axios";
import TORRemittanceRepository, { IRemittance, ITORRemittance } from "../repositories/TORRemittanceRepository";

class TORRemittanceService{

    async SyncGetAllRemittance(){

        
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

            const request = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_remittance/_find", bodyParameters, config);

            const response = await request.data;

            console.log(response.response.data)

            response.response.data.map( async (remittance : ITORRemittance ) =>{
                await TORRemittanceRepository.FindOneAndReplaceRemittance(remittance);
            })

            const destroyToken = await this.EndSession(token);

            return response.response.data;
            
        }catch(e){

            console.error("Error in sync all tor remittance service: "+e);
            return false;

        }

    }
    
    async CreateTORRemittance(newTorRemittance : IRemittance){
    
        try{
            
            const newRemittance = await TORRemittanceRepository.CreateTORRemittance(newTorRemittance);

            if(newRemittance){
                return {status: 0, message: "OK"};
            }else{
                return {status: 1, message: "FAILED"};
            }

           
        }catch(e){
            console.error("Error in create tor remittance service: "+e);
            return {status: 500, message: e};
        }

    }

    async CreateTORRemittanceSync(newTorRemittance : IRemittance){
     
        try{

            const token = await this.GenerateSession();
            
            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }

            const request = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_fuel/records", newTorRemittance, config);

       

            const response = await request.data;

            const destroyToken = await this.EndSession(token);
            return {status: 0, message: "OK"};

        }catch(e){
    
            console.error("Error in create tor remittance service: "+e);
            return {status: 500, message: e};
            
        }
    }

    async GetAllTORRemittance(){

        try{

            const torRemittance = await TORRemittanceRepository.GetAllTORRemittance();

            return torRemittance;

        }catch(e){

            console.error("Error in get all tor remittance service: "+e);
            return false;
        }

    }


    async GetAllDataPerCoopId(coopId : string){

        try{

            const data = await TORRemittanceRepository.GetDataPerCoopId(coopId);

            
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

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){
        try{

            const data = await TORRemittanceRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

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
 
    
    
        async FilterGetDataPerCoopId(coopId: string, fromDate: string, toDate: string, filterType: string, filterData: any) {
            try {
                console.log(fromDate);
                console.log(toDate);
                const data = await TORRemittanceRepository.FilterDataPerCoopId(coopId, fromDate, toDate, filterType, filterData);
    
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
    
                const data = await TORRemittanceRepository.GetDataPerCoopId(coopId)
    
                
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
                        //     "UUID": "ab91cc01-0059-47db-9ad5-a9066ceabcdf",
                        //     "device_id": "ab35271806004845",
                        //     "control_no": "25105142019000001",
                        //     "tor_no": "251-200514-0856",
                        //     "date_of_trip": "10/02/2023",
                        //     "bus_no": "251",
                        //     "route": "PITX-NASUGBU",
                        //     "route_code": "NAS",
                        //     "bound": "SOUTH",
                        //     "trip_no": 4,
                       
                        //     "remittance_time": "2023-10-02 18:53:53.000000",
                        //     "remittance_place": "",
                        //     "remittance_amount": 125.0,
                        //     "remittance_type": "BAGGAGE",
                        //     "ctr_no": "",
                        //     "waybill_ticket_no": "00001",
                        //     "cashier_emp_no": "5060",
                        //     "cashier_emp_name": "CASHIER-1",
                        //     "timestamp": "2023-10-02 18:53:53.000000",
                        //     "lat": "14.069637",
                        //     "long": "120.632632",
                        //     "remarks": ""
                        // }
        
    
                        const bodyParameters : any = {
                            fieldData:{
                                "UUID": tor.fieldData.UUID,
                                "device_id": tor.fieldData.device_id,
                                "control_no": tor.fieldData.control_no,
                                "tor_no": tor.fieldData.tor_no,
                                "date_of_trip": tor.fieldData.date_of_trip,
                                "bus_no": tor.fieldData.bus_no,
                                "route": tor.fieldData.route,
                                "route_code": tor.fieldData.route_code,
                                "bound": tor.fieldData.bound,
                                "trip_no": tor.fieldData.trip_no,
                                "remittance_time": tor.fieldData.remittance_time,
                                "remittance_place": tor.fieldData.remittance_place,
                                "remittance_amount": tor.fieldData.remittance_amount,
                                "remittance_type": tor.fieldData.remittance_type,
                                "ctr_no": tor.fieldData.ctr_no,
                                "waybill_ticket_no": tor.fieldData.waybill_ticket_no,
                                "cashier_emp_no": tor.fieldData.cashier_emp_no,
                                "cashier_emp_name": tor.fieldData.cashier_emp_name,
                                "timestamp": tor.fieldData.timestamp,
                                "lat": tor.fieldData.lat,
                                "long": tor.fieldData.long,
                                "remarks": tor.fieldData.remarks
                            }
                        };
                
                        const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_remittance/records`, bodyParameters, config);
    
                        
                        
                    } catch (e) {
                        console.log(`Error in inserting tor ${e}`);
                    }
                    const updateStatusOfTor = await TORRemittanceRepository.UpdateIsUploaded(tor.fieldData.id, true);
                });
    
                const deleteToken = await this.EndSession(token);
    
                return {status: 0, message: "OK", response: deleteToken}
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
    
        }
    
}

export default new TORRemittanceService();