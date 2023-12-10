import axios from "axios";
import TORMainRepository from "../repositories/TORMainRepository";
import { TOREndSessionService, TORGenerateSessionService } from "./SessionService";
import SummaryTicketModel, { ISummaryTicket } from "../models/SummaryTicketModel";
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


    async SyncTORMainService(){

        try {
            const torMains = await TORMainRepository.GetAllTORMain();
    
            if (torMains && Array.isArray(torMains)) {
                for (const torMain of torMains) {
                    if (torMain.fieldData && Array.isArray(torMain.fieldData) && torMain.fieldData.length > 0) {
                        for (const fieldData of torMain.fieldData) {
                            if (await this.CheckIfUUIDAllowedToInsertService(fieldData)) {
                                // const request = await this.CreateTORMAinToOtherServerService(fieldData);
                            } else {
                                console.log("UUID NOT ALLOWED TO INSERT");
                            }
                        }
                    } 
                }
            } else {
                console.log("No torMains found or it's not an array.");
            }
        } catch (e) {
            console.error("Error in sync tor main service: " + e);
            return { status: 500, message: "Error in sync tor main service: " + e };
        }

    }



    async CheckIfUUIDAllowedToInsertService(UUID : string){
    
        try{

            const token = await TORGenerateSessionService();

            const config = {
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }
            
            const bodyParameters = {
                "query": [{"UUID": UUID}]
            }

            const url = `https://s037817.fmphost.com/fmi/data/v1/databases/filipay_torData/layouts/tor_main/_find`;

            const request = await axios.post(url , bodyParameters, config);

            const deleteToken = await TOREndSessionService(token);

            const response = request.data;

            if(response.response.dataInfo.returnedCount < 0){
                return true;
            }else{
                return false;
            }
            
       


        }catch(e){

            return true;

        }

    }

    

}

export default new TORMainService();