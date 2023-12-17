import { Request, Response } from "express";
import { GetCurrentDate, GetCurrentDateSTR } from "../common/GetCurrentDate";
import TORTroubleServices from "../services/TORTroubleServices";


export async function GetAllTorTroubleController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    
    try{

        const tors = await TORTroubleServices.GetAllTOR()

        if(tors.status === 0 ){
            response.status(200).json({messages : [{
                code: "0",
                message: "OK",
                dateTime: responseDate,
                }],
                response: tors.response
            })
        }else{
            response.status(201).json({messages : [{
                code: tors.status,
                message: tors.message,
                dateTime: responseDate,
                }],
                response: tors.response
            })
        }


    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function CreateNewTorTroubleController(request: Request, response :Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newTOR = await TORTroubleServices.CreateTOR(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: newTOR.response
        })

    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }
}

export async function GetTORTroublePerCoopIdController(request : Request, response: Response){

    try{
        const data = await TORTroubleServices.GetDataPerCoopId(request.params.id)

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
            code: "500",
            message: "Internal Server Error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}

export async function GetTORTroublePyCoopIdAndDateController(request: Request, response: Response){

    
    try{
        if(request.body.fromDate === undefined || request.body.toDate === undefined ||  request.body.fromDate instanceof Date ||  request.body.toDate instanceof Date){
        
            response.status(200).json({messages : [{
                code: 1,
                message: "Invalid fields",
                dateTime: GetCurrentDateSTR(),
            }],
            response: {}
            });
            
        }
        const data = await TORTroubleServices.GetDataPerCoopIdAndDateRange(request.params.id, request.body.fromDate, request.body.toDate);
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });
    }catch(e){
        console.error("Error in tor main controller: "+e)
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in controller: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}


export async function SyncToFileMakerTORTroubleController(request: Request, response : Response){

    try{

      
 
        const updateTORMain = await TORTroubleServices.SyncDataByCoopid(request.params.coopId)
 
         response.status(200).json({messages : [{
             code: updateTORMain.status,
             message: updateTORMain.message,
             dateTime: GetCurrentDateSTR(),
         }],
         response: {}
         });
     }catch(e){
         console.error("Error in tor main controller: "+e)
         response.status(500).json({messages : [{
             code: "212",
             message: "Error in syncing tors: "+e,
             dateTime: GetCurrentDateSTR(),
             }],
             response: {}
         })
     }
 

}