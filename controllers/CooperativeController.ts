import {Request, Response} from 'express'
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import CooperativeService from '../services/CooperativeService';


export async function GetAllCooperativeController( request: Request, response : Response ){

    try{

        const allUsers = await CooperativeService.GetData();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR(),
            }],
            response : allUsers.response
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


export async function GetCooperativePerIdController(request : Request, response : Response){
    try{

        const allUsers = await CooperativeService.GetDataPerId(request.params.id)
        response.status(200).json({messages : [{
            code: allUsers.status,
            message: allUsers.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response : allUsers.response
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "500",
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })

    }
}


export async function AddCooperativeController(request:  Request , response : Response){
      
    try{

        const newStation = await CooperativeService.AddData(request.body);

      
            response.status(200).json({messages : [{
                code: "0",
                message: "OK",
                dateTime: GetCurrentDateSTR(),
                }],
                response : newStation.response
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

export async function UpdateCooperativeByIdAndCoopIdController( request: Request, response: Response ){

    try{

        const data = await CooperativeService.UpdateById(request.body.id, request.body);

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR,
            }],
            response : data.response
        })

    }catch(e){
        
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: 500,
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })
    }

}