import {Request , Response} from 'express'
import ActivityLogService from '../services/ActivityLogService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';


export async function GetActivityLogByCoopIdController(request : Request, response : Response){

    try{

        const data = await ActivityLogService.GetDataPerCoopId(request.params.id)

      
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });


    }catch(e){
        
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: 500,
            message: ""+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })

    }

}


export async function CreateActivityLogController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const insertTicketToDb = await ActivityLogService.AddData(request.body)

        response.status(200).json({messages : [{
            code: insertTicketToDb.status,
            message: insertTicketToDb.message,
            dateTime: responseDate,
            }],
            response: insertTicketToDb.response
        })

 }catch(e){
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Internal server error: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}




