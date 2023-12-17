import axios from "axios";
import TORMainRepository from "../repositories/TORMainRepository";
import { TOREndSessionService, TORGenerateSessionService } from "./SessionService";
import SummaryTicketService from "./SummaryTicketService";


interface ITORMAIN{

    portalData: [],
    recordId: string,
    modId: string,
    
    fieldData : {
        UUID: string,
        
        device_id: string,
        
        control_no: string,
        
        tor_no: string,
        
        date_of_trip: string,
        
        bus_no: string,
        
        route: string,
        
        route_code: string,
        
        emp_no_driver_1: string,
        
        emp_no_driver_2: string,
        
        emp_no_conductor: string,
        
        emp_name_driver_1: string,
        
        emp_name_driver_2: string,
        
        emp_name_conductor: string,
        
        eskirol_id_driver: string,
        
        eskirol_id_conductor: string,
        
        eskirol_name_conductor: string,
        
        no_of_trips: number,
        
        ticket_revenue_atm: number,
        
        ticket_count_atm : number,
        
        ticket_revenue_atm_passenger: number,
        
        ticket_revenue_atm_baggage: number,
        
        ticket_count_atm_passenger: number,
        
        ticket_count_atm_baggage: number,
        
        ticket_revenue_punch: number,
        
        ticket_count_punch: number,
        
        ticket_revenue_punch_passenger: number,
        
        ticket_revenue_punch_baggage: number,
        
        ticket_count_punch_passenger: number,
        
        ticket_count_punch_baggage: number,
        
        ticket_revenue_charter: number,
        
        ticket_count_charter: number,
        
        ticket_revenue_waybill: number,
        
        ticket_count_waybill: number,
        
        ticket_revenue_card: string,
        
        ticket_count_card: string,
        
        ticket_revenue_reserved: string,
        
        ticket_count_reserved: string,
        
        ticket_amount_cancelled: number,
        
        ticket_count_cancelled: number,
        
        ticket_amount_passes: string,
        
        ticket_count_passes: string,
        
        passenger_revenue: number,
        
        baggage_revenue: number,
        
        gross_revenue: number,
        
        passenger_count: number,
        
        baggage_count: number,
        
        commission_driver1_passenger: string,
        
        auto_comission_driver1_passenger: number,
        
        commission_driver1: number,
        
        auto_commission_driver1: number,
        
        commission_driver2_passenger: string,
        
        auto_commission_driver2_passenger: number,
        
        commission_driver2_baggage: string,
        
        auto_commission_driver2_baggage: number,
        
        commission_driver2: number,
        
        auto_commission_driver2: string,
        
        commission_conductor_passenger: string,
        
        auto_commission_conductor_passenger: number,
        
        commission_conductor_baggage: string,
        
        auto_commission_conductor_baggage: number,
        
        commission_conductor: number,
        
        auto_commission_conductor: number,
        
        incentive_driver1: number,
        
        incentive_driver2: number,
        
        incentive_conductor: number,
        
        allowance_driver1: number,
        
        allowance_driver2: number,
        
        allowance_conductor: number,
        
        eskirol_commission_driver: number,
        
        eskirol_commission_conductor: number,
        
        eskirol_cash_bond_driver: number,
        
        eskirol_cash_bond_conductor: number,
        
        toll_fees: number,
        
        parking_fee: number,
        
        diesel : number,
        
        diesel_no_of_liters: number,
        
        other: number,
        
        services: number,
        
        callers_fee: number,
        
        employee_benefits: number,
        
        repair_maintenance: number,
        
        materials: number,
        
        representation: number,
        
        total_expenses: number,
        
        net_collections: number,
        
        total_cash_remitted: number,
        
        final_remittance: number,
        
        final_cash_remitted: number,
        
        overage_shortage: number,
        
        tellers_id: string,
        
        tellers_name: string,
        
        coding: string,
        
        remarks: string
    }
     
        
}

class TORMainService{

    async GetAllTORMain(){

        try{
            
            const tormMains = TORMainRepository.GetAllTORMain();

            return tormMains;
        }catch(e){
            console.error("Error in service: "+e);
            return false;
        }     

    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string){
        try{

            const data = await TORMainRepository.GetDataPerCoopIdAndDateRange(coopId, fromDate, toDate)

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

    async GetDataPerCoopId(coopId: string){
        try{

            const data = await TORMainRepository.GetDataPerCoopId(coopId);

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

  
    

    async GetAllTORMainFromServer(){

        try{

            const token = await TORGenerateSessionService();
        
                const config = {
                    headers :{
                        Authorization : `Bearer ${token}`
                    }
                }
        
                
                const bodyParameters = {
                    "query": [{"remarks" : "test"}, {"remarks" : "live"}]
                }
        
                const requestGetEmployeeFromOtherServer = await axios.post("https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_main/_find", bodyParameters, config)

                requestGetEmployeeFromOtherServer.data.response.data.map(async (torMain : ITORMAIN)=>
                {
                  ///IF UUID PER TORMAIN EXIST IN DATABASE REPLACE THAT DATA WITH SPECIFIC UUID ELSE INSERT IT TO A NEW ONE
                    if(JSON.stringify(await this.SearchTORMainService(torMain.fieldData.UUID)) === '[]'){

                        const request = await this.CreateTORMainService(torMain)
                        console.log("This is request"+request)
                    }else{
       
                        await this.UpdateTORMainService(torMain)
                      
                    }
                  
                })

                const deleteToken = await TOREndSessionService(token);

                return requestGetEmployeeFromOtherServer.data;

                }catch(e){
                    console.error("Error in service: "+e);
                    return false;
                }

    }

    async FilterGetDataPerCoopId(coopId: string, fromDate: string, toDate: string, filterType: string, filterData: any) {
        try {
         
            const data = await TORMainRepository.FilterGetDataPerCoopId(coopId, fromDate, toDate, filterType, filterData);

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

    async UpdateDataPerTorNo(torNo: string, remittedAmount : number, reference_no: string,){

        try {
      
            const data = await TORMainRepository.UpdateDataPerTorNo(torNo, remittedAmount);

   
            if(data > 0)
            {

                const torMain : any = await TORMainRepository.GetDataPerTorNo(torNo);

                if(Object(torMain).length > 0 && torMain !== null){

                    
                   
                    const newSummaryData = await SummaryTicketService.AddData( 
                    {
                        tor_no : torNo,
                        bus_unit: torMain[0].bus_no,
                        cash_collection: remittedAmount,
                        date:  torMain[0].dateCreated,
                        no_of_baggage: torMain[0].baggage_count,
                        no_of_passenger: torMain[0].passenger_count,
                        reference_no: reference_no,
                        route: torMain[0].route,
                        trip: torMain[0].no_of_trips

                    }
                    );

                    if(newSummaryData.status === 0){
                        return {status: 0, message: "OK", response: data}
                    }else{
                        return {status: 1, message: newSummaryData, response: data}
                    }

                    
                }else{
                    return {status: 1, message: "Invalid Tor No", response: {}}
                }

                
            }else{
                return {status: 1, message: "Invalid Tor No", response: {}}
            }

        } catch (e) {
            console.error(`Error in services: ${e}`);
            return {status: 500, message: e, response: {}}
        }
        
    }


    async CreateTORMainService(fieldData : ITORMAIN) {

        try{
            // const torMain ={
            //     portalData: [],
            //     recordId: "",
            //     modId: "",
            //     fieldData: fieldData.fieldData,
            // }

            const newTorMain = TORMainRepository.CreateNewTORMain(fieldData);
            return true;

        }catch(e){
            console.error("Error in create tor main service: "+e)
            return false;
        }

    }

    async UpdateTORMainServiceToOtherServer(tor : ITORMAIN, recordId : string){

        try{

            const token = await TORGenerateSessionService();
        
                const config = {
                    headers :{
                        Authorization : `Bearer ${token}`
                    }
                }
                
                const bodyParameters = {
                    "fieldData" : tor.fieldData
                }

                const url = `https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_main/records/${recordId}`;


                const addNewTorInOtherServer = await axios.patch(url ,
                bodyParameters, config)
                    
                const responseAddNewTorInOtherServer = await addNewTorInOtherServer.data;
                    
                const deleteToken = await TOREndSessionService(token);
    
                return true;

        }catch(e){
            console.error("Error in update tor main to other server service: "+e);
            return false;
        }

    }

    async UpdateTORMainService(tor: any){

        try{

            const updateTORMain = await TORMainRepository.UpdateTORMainPerUUID(tor);

            return updateTORMain;

        }catch(e){
            console.error("Error in tor main service: "+e);
            return false;
        }

    }

    async SearchTORMainService(UUID : string) : Promise<ITORMAIN | {}>{

        try{

            const torMain : any = await TORMainRepository.SearchTORMainPerUUID(UUID);
       
            return torMain;

        }catch(e){
            console.error("Error in search tormain service: "+e);
            return {};
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
    
                const data = await TORMainRepository.GetDataIsNotUploaded(coopId);
    
                
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
                      
                        const bodyParameters : any = {
                            fieldData:{
                                
                                    "UUID": tor.UUID,
                                    "device_id": tor.device_id,
                                    "control_no": tor.control_no,
                                    "tor_no": tor.tor_no,
                                    "date_of_trip": tor.date_of_trip,
                                    "bus_no": tor.bus_no,
                                    "route": tor.route,
                                    "route_code": tor.route_code,
                                    "emp_no_driver_1": tor.emp_no_driver_1,
                                    "emp_no_driver_2": tor.emp_no_driver_2,
                                    "emp_no_conductor": tor.emp_no_conductor,
                                    "emp_name_driver_1": tor.emp_name_driver_1,
                                    "emp_name_driver_2": tor.emp_name_driver_2,
                                    "emp_name_conductor": tor.emp_name_conductor,
                                    "eskirol_id_driver": tor.eskirol_id_driver,
                                    "eskirol_id_conductor": tor.eskirol_id_conductor,
                                    "eskirol_name_driver": tor.eskirol_name_driver,
                                    "eskirol_name_conductor": tor.eskirol_name_conductor,
                                    "no_of_trips": tor.no_of_trips,
                                    "ticket_revenue_atm": tor.ticket_revenue_atm,
                                    "ticket_count_atm": tor.ticket_count_atm,
                                    "ticket_revenue_atm_passenger": tor.ticket_revenue_atm_passenger,
                                    "ticket_revenue_atm_baggage": tor.ticket_revenue_atm_baggage,
                                    "ticket_count_atm_passenger": tor.ticket_count_atm_passenger,
                                    "ticket_count_atm_baggage": tor.ticket_count_atm_baggage,
                                    "ticket_revenue_punch": tor.ticket_revenue_punch,
                                    "ticket_count_punch": tor.ticket_count_punch,
                                    "ticket_revenue_punch_passenger": tor.ticket_revenue_punch_passenger,
                                    "ticket_revenue_punch_baggage": tor.ticket_revenue_punch_baggage,
                                    "ticket_count_punch_passenger": tor.ticket_count_punch_passenger,
                                    "ticket_count_punch_baggage": tor.ticket_count_punch_baggage,
                                    "ticket_revenue_charter": tor.ticket_revenue_charter,
                                    "ticket_count_charter": tor.ticket_count_charter,
                                    "ticket_revenue_waybill": tor.ticket_revenue_waybill,
                                    "ticket_count_waybill": tor.ticket_count_waybill,
                                    "ticket_amount_cancelled": tor.ticket_amount_cancelled,
                                    "ticket_count_cancelled": tor.ticket_count_cancelled,
                                    "ticket_amount_passes": tor.ticket_amount_passes,
                                    "ticket_count_passes": tor.ticket_count_passes,
                                    "passenger_revenue": tor.passenger_revenue,
                                    "baggage_revenue": tor.baggage_revenue,
                                    "gross_revenue": tor.gross_revenue,
                                    "passenger_count": tor.passenger_count,
                                    "baggage_count": tor.baggage_count,
                                    "commission_driver1_passenger": tor.commission_driver1_passenger,
                                    "auto_commission_driver1_passenger": tor.auto_commission_driver1_passenger,
                                    "commission_driver1_baggage": tor.commission_driver1_baggage,
                                    "auto_commission_driver1_baggage": tor.auto_commission_driver1_baggage,
                                    "commission_driver1": tor.commission_driver1,
                                    "auto_commission_driver1": tor.auto_commission_driver1,
                                    "commission_driver2_passenger": tor.commission_driver2_passenger,
                                    "auto_commission_driver2_passenger": tor.auto_commission_driver2_passenger,
                                    "commission_driver2_baggage": tor.commission_driver2_baggage,
                                    "auto_commission_driver2_baggage": tor.auto_commission_driver2_baggage,
                                    "commission_driver2": tor.commission_driver2,
                                    "auto_commission_driver2": tor.auto_commission_driver2,
                                    "commission_conductor_passenger": tor.commission_conductor_passenger,
                                    "auto_commission_conductor_passenger": tor.auto_commission_conductor_passenger,
                                    "commission_conductor_baggage": tor.commission_conductor_baggage,
                                    "auto_commission_conductor_baggage": tor.auto_commission_conductor_baggage,
                                    "commission_conductor": tor.commission_conductor,
                                    "auto_commission_conductor": tor.auto_commission_conductor,
                                    "incentive_driver1": tor.incentive_driver1,
                                    "incentive_driver2": tor.incentive_driver2,
                                    "incentive_conductor": tor.incentive_conductor,
                                    "allowance_driver1": tor.allowance_driver1,
                                    "allowance_driver2": tor.allowance_driver2,
                                    "allowance_conductor": tor.allowance_conductor,
                                    "eskirol_commission_driver": tor.eskirol_commission_driver,
                                    "eskirol_commission_conductor": tor.eskirol_commission_conductor,
                                    "eskirol_cash_bond_driver": tor.eskirol_cash_bond_driver,
                                    "eskirol_cash_bond_conductor": tor.eskirol_cash_bond_conductor,
                                    "toll_fees": tor.toll_fees,
                                    "parking_fee": tor.parking_fee,
                                    "diesel": tor.diesel,
                                    "diesel_no_of_liters": tor.diesel_no_of_liters,
                                    "others": tor.others,
                                    "services": tor.services,
                                    "callers_fee": tor.callers_fee,
                                    "employee_benefits": tor.employee_benefits,
                                    "repair_maintenance": tor.repair_maintenance,
                                    "materials": tor.materials,
                                    "representation": tor.representation,
                                    "total_expenses": tor.total_expenses,
                                    "net_collections": tor.net_collections,
                                    "total_cash_remitted": tor.total_cash_remitted,
                                    "final_remittance": tor.final_remittance,
                                    "final_cash_remitted": tor.final_cash_remitted,
                                    "overage_shortage": tor.overage_shortage,
                                    "tellers_id": tor.tellers_id,
                                    "tellers_name": tor.tellers_name,
                                    "coding": tor.coding,
                                    "remarks": tor.remarks
                                
                            }
                        };
                
                        const request = await axios.post(`${process.env.DLTB_API_CREATE_TOR}/tor_main/records`, bodyParameters, config);
    
                        
                        
                    } catch (e) {
                        console.log(`Error in inserting tor ${e}`);
                    }
                    const updateStatusOfTor = await TORMainRepository.UpdateIsUploaded(tor.id, true);
                });
    
                const deleteToken = await this.EndSession(token);
    
                return {status: 0, message: "OK", response: deleteToken}
            }catch(e){
                console.error(`Error in services: ${e}`);
                return {status: 500, message: e, response: {}}
            }
    
        }

    

}

export default new TORMainService();