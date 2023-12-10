import {Request, Response }from 'express'
import { GetCurrentDate, GetCurrentDateSTR } from '../common/GetCurrentDate'
import DispatchServices from '../services/DispatchServices';

export async function GetAllDispatch(request : Request, response : Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const dispatch = await DispatchServices.GetAllDispatch();
        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : dispatch
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


export async function AddDispatchController(request : Request, response : Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const dispatch = await DispatchServices.AddDispatch(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : dispatch.response
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