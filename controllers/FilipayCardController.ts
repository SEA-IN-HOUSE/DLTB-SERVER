
import {Request, Response } from 'express'
import FilipayCardService from '../services/FilipayCardService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';


export async function GetFilipayCardController(request : Request, response : Response){

    try{

        const data = await FilipayCardService.GetAllData();

      
            response.status(200).json({messages : [{
                code: data?.status,
                message: data?.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: data?.response
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


export async function UpdateMasterCardAndFilipayCardController(request : Request, response : Response){
    try{
        console.log(`request.body.masterCardId ${request.body.masterCardId}`)
        if(request.body.masterCardId === "" || request.body.masterCardId === undefined || request.body.filipayCardId === "" || request.body.filipayCardId === undefined || request.body.amount === "" || typeof request.body.amount !== 'number' ){
        
            response.status(200).json({messages : [{
                code: 1,
                message: "Invalid fields",
                dateTime: GetCurrentDateSTR(),
                }],
                response: {}
            })
            
        }else{
            const data = await FilipayCardService.UpdateIncreaseMasterCardDecreaseFilipayCard(request.body.masterCardId, request.body.filipayCardId, request.body.amount, request.body.coopId);

            response.status(200).json({messages : [{
                code: data?.status,
                message: data?.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: data?.response
            })
        }

       

        
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