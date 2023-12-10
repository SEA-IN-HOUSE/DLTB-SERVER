import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import TORTripServices from "../services/TORTripServices";
import TORTicketServices from "../services/TORTicketServices";


export async function GetAllTORTripController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const createTicket : any = await TORTripServices.GetAllTORTrip();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: createTicket.response
        })

    }catch(e){
        console.error("Error in getting all tor trip controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}

export async function CreateTORTripController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newTORTrip = await TORTripServices.AddNewTORTrip(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: newTORTrip.response
        })

    }catch(e){
        console.error("Error in creating new tor trip controller: "+e);

    }

}

export async function GetTORTripPerCoopIdController(request : Request, response : Response){

    try{

        const data = await TORTripServices.GetDataPerCoopId(request.params.id)
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



export async function GetTorTripByCoopIdAndFilterController(request : Request, response : Response){

    try{

        const data = await TORTripServices.FilterGetDataPerCoopId(request.params.id, request.body.fromDate, request.body.toDate, request.body.filterType, request.body.filterData)
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

export async function UpdateTORTripByControlNoController(request : Request, response :Response){

    try{
        if(
            request.body.coopId === undefined 
            || request.body.UUID === undefined
            || request.body.device_id === undefined
            || request.body.control_no === undefined
            || request.body.tor_no === undefined
            || request.body.date_of_trip === undefined
            || request.body.bus_no === undefined
            || request.body.route === undefined
            || request.body.route_code === undefined
            || request.body.bound === undefined
            || request.body.trip_no === undefined
            || request.body.departed_place === undefined
        ){
        
            response.status(200).json({messages : [{
                code: 1,
                message: "Invalid fields",
                dateTime: GetCurrentDateSTR(),
            }],
            response: {}
            });
            
        }else{
            const data = await TORTripServices.UpdateDataPerControlNo(request.params.id, request.body)
            response.status(200).json({messages : [{
                code: data.status,
                message: data.message,
                dateTime: GetCurrentDateSTR(),
            }],
            response: data.response
            });
        }
        
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
        const data = await TORTripServices.GetDataPerCoopIdAndDateRange(request.params.id, request.body.fromDate, request.body.toDate);
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