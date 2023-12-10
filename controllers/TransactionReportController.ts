import {Request, Response} from 'express'
import TransactionReportService from '../services/TransactionReportService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import SummaryTicketService from '../services/SummaryTicketService';
import { ISummaryTicket } from '../models/SummaryTicketModel';

export async function GetAllTransactionReportController(request : Request , response: Response){

    try{

        const data = await TransactionReportService.GetAllData();

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response: data.response
        })
    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}

export async function AddDataTransactionReportController(request : Request , response: Response){

    try{

        const data = await TransactionReportService.AddData(request.body)

            response.status(200).json({messages : [{
                code: data.status,
                message:data.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: data.response
            })
          

       

       
    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}