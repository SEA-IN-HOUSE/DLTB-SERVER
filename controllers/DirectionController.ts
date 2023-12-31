import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import { directionRepo } from "../repositories/DirectionRepository";
import DirectionService from "../services/DirectionService";

export async function GetAllDirectionsController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();
    
    try{

        const directions = await directionRepo.GetAllDirections();

        // console.log(directions[])

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
        }],
            response: directions
        });


    }catch(e){
        console.error("Error in controller");
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting all directions: "+e,
            dateTime: responseDate,
        }]})
    }

}

export async function AddNewDirectionController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newDirection = await directionRepo.AddNewDirection(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
        }],
            response:{}
        });
       

    }catch(e){
        console.error("Error in controller");
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting all directions: "+e,
            dateTime: responseDate,
        }]})
    }

}


export async function GetAllDirectionPerCoopIdController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();
    
    try{

        const directions = await directionRepo.GetAllPerCoopId(request.params.id);

        console.log(directions);

        if(directions === null){
            response.status(200).json({messages : [{
                code: "1",
                message: "Invalid coop id",
                dateTime: GetCurrentDateSTR(),
            }],
            response: {}
            });
        }else{
            response.status(200).json({messages : [{
                code: "0",
                message: "OK",
                dateTime: GetCurrentDateSTR(),
            }],
            response: directions
            });
        }
         
    


    }catch(e){
        console.error("Error in controller");
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting all directions: "+e,
            dateTime: responseDate,
        }]})
    }

}

export async function GetDirectionByCoopIdAndFilterController(request : Request, response : Response){

    try{

        const data = await DirectionService.FilterGetDataPerCoopId(request.params.coopId, request.body.fromDate, request.body.toDate, request.body.filterType, request.body.filterData)
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


export async function UpdateDirectionByIdController(request: Request, response : Response){

    
    try{
        const data = await DirectionService.UpdateById(request.params.id, request.body);
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response : data.response
        })
    
    
       
    
    }catch(e){
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting all employees: "+e,
            dateTime: GetCurrentDateSTR(),
        }],
        response:{}
    });
    }
    
    }


    
export async function DeleteDirectionByIdController(request: Request, response : Response){

    
    try{
        console.log(`PARAMS ID: ${request.params.id}`)
        const data = await DirectionService.DeleteById(request.params.id);
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response : data.response
        })
    
    
       
    
    }catch(e){
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting all employees: "+e,
            dateTime: GetCurrentDateSTR(),
        }],
        response:{}
    });
    }
    
    }