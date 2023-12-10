import { ISummaryTicket } from "../models/SummaryTicketModel";
import SummaryTicketRepository from "../repositories/SummaryTicketRepository";


class SummaryTicketService{

    async GetDataPerId( id : string){
        try{

            const data = await SummaryTicketRepository.GetDataPerId(id)

            
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

    async GetDataPerReferenceNo(referenceNo : string){

        try{

            const data = await SummaryTicketRepository.GetDataPerReferenceNo(referenceNo)

            
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

    async AddData(data : ISummaryTicket){

        try{
            console.log(data)
            const newData : any = await SummaryTicketRepository.AddData(data)

            if(newData.code !== 11000){
                return {status: 0, message: "OK", response: {}}
            }else{
                return {status: 1, message: "Invalid Fields", response: newData}
            }

        }catch(e){
            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}
        }

    }

    async GetAllData(){
        try{

            const data = await SummaryTicketRepository.GetAllData();

            
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

    async FilterGetData( fromDate: string, toDate: string, filterType: string, filterData: any) {
        try {
         
            const data = await SummaryTicketRepository.FilterGetData(fromDate, toDate, filterType, filterData);

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

}

export default new SummaryTicketService();