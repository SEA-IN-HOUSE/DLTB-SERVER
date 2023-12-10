import {Request, Response} from 'express';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import RiderWalletService from '../services/RiderWalletService';
import TORTicketServices from '../services/TORTicketServices';

export async function NewBalanceTorTicketController(request : Request, response : Response){
    
    const decreaseAmountValue : number =  request.body.decreaseAmount? request.body.amount : 0;
    try{

        const updateRiderWallet = await RiderWalletService.UpdateRiderWalletByCardId(request.body.coopId, request.body.cardId, decreaseAmountValue, 0, request.body.cardType, request.body.isNegative);
        
        if(updateRiderWallet.status === 0){

            const insertTicketToDb = await TORTicketServices.InsertTORTickeToOurDBServices(request.body.torTicket);

            response.status(200).json({messages : [{
                code: insertTicketToDb.status,
                message: insertTicketToDb.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: insertTicketToDb.response
            })

        }else{
            response.status(200).json({messages : [{
                code:updateRiderWallet.status,
                message: updateRiderWallet.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: {}
            })
        }

        

    }catch(e){
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })

    }
}