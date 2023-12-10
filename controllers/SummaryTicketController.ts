import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import SummaryTicketService from "../services/SummaryTicketService";

import { Request, Response } from "express";

export async function GetDataByReferenceNoSummaryTicketController(request : Request, response: Response){


    try{

      

        const data = await SummaryTicketService.GetDataPerReferenceNo(request.params.id)
        console.log(data)
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });

    }catch(e){
        response.status(500).json({messages : [{
            code: "500",
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }


}


export async function GetByFilterSummaryTicketController(request : Request, response: Response){
    try{

      

        const data = await SummaryTicketService.FilterGetData(request?.body.fromDate, request?.body.toDate, request?.body.filterType, request?.body.filterData)
        console.log(data)
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });

    }catch(e){
        response.status(500).json({messages : [{
            code: "500",
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }
}