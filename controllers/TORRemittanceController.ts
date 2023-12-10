import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import TORRemittanceService from "../services/TORRemittanceService";




export async function SyncGetAllTORRemittanceController(request : Request, response : Response){

    const responseDate = await GetCurrentDateSTR();

    try{

        const getAllTorRemittance = await TORRemittanceService.SyncGetAllRemittance();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: getAllTorRemittance
        })

    }catch(e){
        console.error("Error in sync get all tor remittance controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in creating tor ticket: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function CreateTORRemittanceController(request: Request, response: Response){

    const responseDate =  GetCurrentDateSTR();

    try{

        const createTORRemittance = await TORRemittanceService.CreateTORRemittance(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: {}
        })

    }catch(e){
        console.error("Error in creating new tor remittance controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in creating tor ticket: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function GetAllRemittanceController(request : Request, response : Response){

    const responseDate =  GetCurrentDateSTR();

    try{

        const torRemittance = await TORRemittanceService.GetAllTORRemittance();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: torRemittance
        })

    }catch(e){
        console.error("Error in get all tor remittance controller: "+e);
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in creating tor ticket: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function GetTORRemittancePerCoopIdController(request : Request, response : Response){

   
    try{

        const data = await TORRemittanceService.FilterGetDataPerCoopId(request.params.id, request.body.fromDate, request.body.toDate, request.body.filterType, request.body.filterData)
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


export async function GetTORRemittanceByCoopIdAndDateController(request: Request, response: Response){

    
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
        const data = await TORRemittanceService.GetDataPerCoopIdAndDateRange(request.params.id, request.body.fromDate, request.body.toDate);
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
            message: "Error in getting employees: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}