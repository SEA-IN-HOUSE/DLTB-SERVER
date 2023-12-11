import {Request, Response}  from 'express';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import StationService from '../services/StationService';
import { io } from '../app';

export async function GetAllStationController (request: Request, response: Response){

    try{

        const allStations = await StationService.GetAllStation();

        
    // Emit event to all connected clients
    io.emit('stationsUpdated', { response: allStations.response });

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : allStations.response
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })
    }

}

export async function AddStationController( request: Request, response: Response ){

    try{

        const newStation = await StationService.AddStation(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : newStation.response
        })

    }catch(e){
        
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })
    }

}

export async function GetAllStationPerCoopIdController(request : Request, response : Response){

try{
    const data = await StationService.GetAllDataPerCoopId(request.params.id);
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

export async function GetStationPerCoopIdAndRouteIdController(request: Request, response : Response){

    
try{
    const data = await StationService.GetDataPerCoopIdAndRouteId(request.params.coopId, request.params.routeId);
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