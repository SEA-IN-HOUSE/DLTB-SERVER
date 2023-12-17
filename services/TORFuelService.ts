import axios from "axios";
import TORFuelRepository from "../repositories/TORFuelRepository";


interface IFuel{
    UUID: string,
    device_id: string,
    control_no: string,
    tor_no: string,
    date_of_trip: string,
    bus_no: string,
    route: string,
    route_code: string,
    bound: string,
    trip_no: number,
    refuel_date: string,
    refuel_time: string,
    fuel_station: string,
    fuel_liters: number,
    fuel_amount: number,
    fuel_price_per_liter: number,
    fuel_attendant_id: number,
    fuel_attendant: string,
    full_tank: string,
    timestamp: string,
    lat: string,
    long:string,
    remarks: string
}

interface ITORFuel{
    portalData: {},
    recordId: string,
    modId: string
    fieldDate: IFuel
}


class TORFuelService{

    
    async SyncGETAllTORFuelService(){

        try{

            const token = await this.GenerateSession();

            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }
            
            const bodyParameters = {
                "query": [{"bound" : "SOUTH"}, {"bound" : "NORTH"}, {"bound" : ""}]
            }

            const request = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_fuel/_find", bodyParameters, config);

            const response = await request.data;

            console.log(response.response.data)

            response.response.data.map(async (torFuel : ITORFuel) =>{

                await TORFuelRepository.FindAndReplaceTORFuel(torFuel)

            })

            const destroyToken = await this.EndSession(token);

            return response.response.data
           

        }catch(e){
            console.error("Error in sync all tor fuel service: "+e);
            return false;
        }

    }

    async CreateTORFuelService(torFuel : any){
    
        try{
           
            const newTorFuel = await TORFuelRepository.CreateTORFuel(torFuel);

        }catch(e){
            console.error("Error in create tor remittance service: "+e);
            return {status: 500, message: e};
        }

    }

    async GetAllDataPerCoopId(coopId : string){

        try{

            const data = await TORFuelRepository.GetDataPerCoopId(coopId)

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

    async CreateTORFuelServiceSync(torFuel : IFuel){

        try{

            const token = await this.GenerateSession();

            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }

            const request = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_fuel/records", torFuel, config);

            await request.data;

            const destroyToken = await this.EndSession(token);
    
            return {status: 0, message: "OK"};

        }catch(e){
            console.error("Error in creating new tor ticket service: "+e);
            return {status: 500, message: e};
        }

    }

    async GetAllTORFuelService(){
    
        try{

            const torFuels = await TORFuelRepository.GetAllTOURFuel();

            return torFuels;

        }catch(e){
            console.error("Error in get all tor fuel service: "+e);

            return {status: 500, message: e};
        }

    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){
        try{

            const data = await TORFuelRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

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
    
                const data = await TORFuelRepository.GetDataIsNotUploaded(coopId);
    
                
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
                        //     "UUID": "ab91cc01-0059-47db-9ad5-a9066ceabcde",
                        //     "device_id": "ab35271806004845",
                        //     "control_no": "25102142020000008",
                        //     "tor_no": "251-200514-0856",
                        //     "date_of_trip": "05/14/2020",
                        //     "bus_no": "251",
                        //     "route": "PITX-NASUGBU",
                        //     "route_code": "NAS",
                        //     "bound": "NORTH",
                        //     "trip_no": 1,
                        //     "refuel_date": "2019-12-23 09:39:05.000000",
                        //     "refuel_time": "2019-12-23 09:39:05.000000",
                        //     "fuel_station": "LRT NEW TANK",
                        //     "fuel_liters": 100.0,
                        //     "fuel_amount": 0.0,
                        //     "fuel_price_per_liter": 0.0,
                        //     "fuel_attendant": "DESTREZA, ALAN C.",
                        //     "full_tank": "",
                        //     "timestamp": "2019-12-23 09:05:35.000000",
                        //     "lat": "14.076688",
                        //     "long": "120.866036",
                        //     "remarks": ""
                        // }

    
                        const bodyParameters : any = {
                            fieldData: {
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
                                "refuel_date":tor.fieldData.refuel_date,
                                "refuel_time":tor.fieldData.refuel_time,
                                "fuel_station":tor.fieldData.fuel_station,
                                "fuel_liters":tor.fieldData.fuel_liters,
                                "fuel_amount":tor.fieldData.fuel_amount,
                                "fuel_price_per_liter":tor.fieldData.fuel_price_per_liter,
                                "fuel_attendant":tor.fieldData.fuel_attendant,
                                "full_tank":tor.fieldData.full_tank,
                                "timestamp":tor.fieldData.timestamp,
                                "lat":tor.fieldData.lat,
                                "long":tor.fieldData.long,
                                "remarks":tor.fieldData.remarks
                            }
                        };
                
                        const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_fuel/records`, bodyParameters, config);
    
                        
                        
                    } catch (e) {
                        console.log(`Error in inserting tor ${e}`);
                    }
                    const updateStatusOfTor = await TORFuelRepository.UpdateIsUploaded(tor.fieldData.id, true);
                });
    
                const deleteToken = await this.EndSession(token);
    
                return {status: 0, message: "OK", response: deleteToken}
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
    
        }

}

export default new TORFuelService();