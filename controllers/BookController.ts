import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import BookingService from "../services/BookingService"
import { Request, Response } from "express";

export async function VerifyBookingController(request : Request, response: Response){

    try{

        const data = await BookingService.VerifyBooking();

        response.status(200).json({messages : [{
            code:"0",
            message: "OK",
            dateTime: GetCurrentDateSTR(),
            }],
            response: data
        })
    
    }catch(e){
        console.log(`Error in ${e}`)
        response.status(500).json({messages : [{
            code: "500",
            message: "Internal Server Error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}