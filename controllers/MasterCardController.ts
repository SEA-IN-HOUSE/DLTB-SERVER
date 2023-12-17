import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import MasterCardServices from "../services/MasterCardServices";
import MasterCardRepository from "../repositories/MasterCardRepository";

export async function GetAllMasterCardByCoopIdController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const masterCards = await MasterCardServices.GetAllMasterCardByCoopId(request.params.id);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: masterCards
        })

       

    }catch(e){

        console.error("Error in getting all master card controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting mastercard: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}

export async function GetAllMasterCardController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const masterCards = await MasterCardServices.GetAllMasterCard();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: masterCards
        })

       

    }catch(e){

        console.error("Error in getting all master card controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting mastercard: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}

export async function AddNewMasterCardController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const newMasterCard = await MasterCardServices.CreateNewMasterCard(request.body);

        console.log(newMasterCard)

        response.status(200).json({messages : [{
            code: newMasterCard?.status,
            message: newMasterCard?.message,
            dateTime: responseDate,
            }],
            response: {}
        })
      

    }catch(e){

        console.error("Error in adding new master card controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting mastercard: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }


}