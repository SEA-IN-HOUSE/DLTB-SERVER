import SummaryTicketModel from "../models/SummaryTicketModel";
import TransactionReportModel, { ITransactionReport } from "../models/TransactionReportModel";

class TransactionReportRepository{

    async GetDataPerId( id : string){

        try{

            const data = await TransactionReportModel.find({"id": id});

            return data

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return e;

        }


    }

    async GetAllData(){
        
        try{

            const data = await TransactionReportModel.find({});

            return data

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return null;

        }
    }

    async AddData(data : ITransactionReport, receiptUrl : string){

        try{
            
            data.receiptUrl = receiptUrl;
            
            const newData = new TransactionReportModel(data);


            return await newData.save();

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return null;

        }
    }

}

export default new TransactionReportRepository();