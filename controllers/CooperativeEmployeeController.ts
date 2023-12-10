import {Request, Response} from "express";
import CooperativeEmployeeService from "../services/CooperativeEmployeeService";
import { GetCurrentDate, GetCurrentDateSTR } from "../common/GetCurrentDate";

export async function AddCooperativeEmployeeController( request: Request, response : Response ){

    try{

        const newEmployee = await CooperativeEmployeeService.AddCooperativeEmployee(request.body);


        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR(),
            }],
            response : newEmployee.response
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

export async function GetAllCooperativeEmployeeController( request: Request , response: Response ){

    try{

        const allCooperativeEmployee = await CooperativeEmployeeService.GetAllCooperativeEmployee();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDate(),
            }],
            response : allCooperativeEmployee.response
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