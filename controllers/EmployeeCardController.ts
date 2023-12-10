import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import EmployeeCardService from "../services/EmployeeCardService";


export async function CreateNewEmployeeCardController(request: Request, response : Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newEmployeeCard = await EmployeeCardService.RegisterNewEmployeeCard(request.body);
        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: newEmployeeCard.response
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


export async function GetAllEmployeeCardPerCoopId(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    
    try{

        const employeeCards = await EmployeeCardService.GetAllCardPerCoopId(request.params.id);

        response.status(200).json({messages : [{
            code: employeeCards.status,
            message: employeeCards.message,
            dateTime: responseDate,
            }],
            response: employeeCards.response
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

export async function GetAllEmployeeCardController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    
    try{

        const employeeCards = await EmployeeCardService.GetAllEmployeeCard()

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : employeeCards.response
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