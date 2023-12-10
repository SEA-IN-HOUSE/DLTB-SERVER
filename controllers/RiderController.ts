
import { Request, Response } from "express";
import {  GetCurrentDateSTR } from "../common/GetCurrentDate";
import RiderServices from "../services/RiderServices";

export async function GetRiderByCardIdController( request : Request, response : Response ){

    const responseDate = GetCurrentDateSTR();

    
    try{

        const rider = await RiderServices.GetRiderByCardId( request.params.id )

        response.status(200).json({messages : [{
            code: "0",
            message: rider.message,
            dateTime: responseDate,
            }],
            response : rider.response
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

export async function GetAllRiderController(request : Request, response : Response){

    const responseDate = GetCurrentDateSTR()

    try{

        const riders = await RiderServices.GetAllRider();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : riders.response
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

export async function AddRiderController( request: Request, response : Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newRider = await RiderServices.AddRiderWallet(request.body)

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : newRider.response
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