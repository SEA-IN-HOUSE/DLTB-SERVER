import { ITransactionReport } from "../models/TransactionReportModel";
import TransactionReportRepository from "../repositories/TransactionReportRepository";

class TransactionReportService{

    async GetDataPerId( id : string){
        try{

            const data = await TransactionReportRepository.GetDataPerId(id)

            
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

    async AddData(data : ITransactionReport){

        try{

            const newData : any = await TransactionReportRepository.AddData(data)
            
            console.log(`New transaction data ${newData}`)
            if(newData.code !== 11000 && newData !== null){
                return {status: 0, message: "OK", response: {}}
            }else{
                return {status: 1, message: "Invalid Fields", response: newData}
            }

        }catch(e){
            console.error("Error in add data service: "+e);
            return {status: 500, message: e, response: {}}
        }

    }

    async GetAllData(){
        try{

            const data = await TransactionReportRepository.GetAllData();

            
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

export default new TransactionReportService();