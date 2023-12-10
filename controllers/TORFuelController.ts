import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import TORFuelService from "../services/TORFuelService";

export async function SyncGetAllTorFuelController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const toFuel = await TORFuelService.SyncGETAllTORFuelService();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: toFuel
        })

    }catch(e){
        console.error("Error in sync get all tor fuel controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function CreateTORFuelController(request: Request, response : Response){

    const responseDate = GetCurrentDateSTR();

    try{console.log("tessdfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffft")

        const createTorFuel = await TORFuelService.CreateTORFuelService(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: {}
        })

    }catch(e){

        console.error("Error in sync get all tor fuel controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}


export async function GetAllTORFuelController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const torFuels = await TORFuelService.GetAllTORFuelService();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
        }],
        response: torFuels
        });

    }catch(e){

        console.error("Error in sync get all tor fuel controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}

export async function GetDataPerCoopIdController(request : Request, response : Response){

    try{

        const data = await TORFuelService.GetAllDataPerCoopId(request.params.id)

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });

    }catch(e){
        console.error("Error in sync get all tor fuel controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}

export async function GetTORFuelByCoopIdAndDateController(request: Request, response: Response){

    
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
        const data = await TORFuelService.GetDataPerCoopIdAndDateRange(request.params.id, request.body.fromDate, request.body.toDate);
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