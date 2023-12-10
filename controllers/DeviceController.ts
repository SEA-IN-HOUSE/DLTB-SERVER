import {Request, Response} from 'express';
import DeviceService from '../services/DeviceService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';

export async function GetAllDevicePerCoopId(request : Request, response: Response){

    try{

        const allUsers = await DeviceService.GetDataPerCoopId(request.params.id);

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


export async function GetDevicePerDeviceIdController( request : Request, response : Response){

    try{

        const data = await DeviceService.GetDataPerDeviceId(request.params.id)

      
            response.status(200).json({messages : [{
                code: data.status,
                message: data.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response : data.response
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


export async function GetAllDeviceController( request : Request, response : Response){

    try{

        const allUsers = await DeviceService.GetData();
        
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

export async function GetCoopPerDeviceIdController( request : Request, response : Response){

    try{

        const data = await DeviceService.GetDataPerCoopId(request.params.id);

      
            response.status(200).json({messages : [{
                code: data.status,
                message: data.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response : data.response
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

export async function AddDeviceController(request:  Request , response : Response){
      
    try{

        const newStation = await DeviceService.AddData(request.body);

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