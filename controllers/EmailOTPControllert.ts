
import {Request, Response} from 'express'
import EmailOTPService from '../services/EmailOTPService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';


export async function GetAllEmailOTPController( request : Request, response : Response){

    
    try{

        const data = await EmailOTPService.GetAllData();
        
        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR(),
            }],
            response : data
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

export async function AddEmailController( request : Request, response : Response ){

    try{

        const data = await EmailOTPService.AddData(request.body.email);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
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

export async function CheckOTPController( request : Request, response : Response){

    try{

        const email = request.body.email;

        const otp = request.body.otp;

        const data = await EmailOTPService.ValidateOtp(otp, email);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
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