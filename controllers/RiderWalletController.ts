import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import RiderWalletService from "../services/RiderWalletService";


export async function GetAllRiderWalletController(request : Request , response : Response){
    
    const responseDate = GetCurrentDateSTR();

    try{

        const riderWallets = await  RiderWalletService.GetAllRiderWallet();

            response.status(200).json({messages : [{
                code: riderWallets.status,
                message: riderWallets.message,
                dateTime: responseDate,
                }],
                response: riderWallets.response
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

export async function GetRiderWalletPerIdController ( request : Request, response : Response){

    try{

        const riderWallet = await RiderWalletService.GetRiderWalletCardIdPerId(request.params.cardId);

       
           
        response.status(200).json({messages : [{
            code: riderWallet.status,
            message: riderWallet.message,
            dateTime: GetCurrentDateSTR,
            }],
            response : riderWallet.response
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

export async function AddRiderWalletController( request : Request, response : Response ){

    const responseDate = GetCurrentDateSTR();

    try{

        const newRiderWallet = await  RiderWalletService.AddRiderWallet(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response : newRiderWallet.response
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

export async function GetRiderWalletBalanceController(request : Request, response : Response){

    try{

      
    
        const riderWalletBalance = await RiderWalletService.GetBalancePerCardId(request.params.cardId, request.params.cardType, request.params.coopId);
                response.status(200).json({messages : [{
                code: riderWalletBalance?.status,
                message: riderWalletBalance?.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response : riderWalletBalance?.response
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

export async function UpdateRiderWalletBalanceController( request : Request, response : Response){

    const increaseAmountValue : number = request.body.increaseAmount? request.body.increaseAmount : 0;
    const decreaseAmountValue : number =  request.body.decreaseAmount? request.body.decreaseAmount : 0;

    try{

      
    
        const updateRiderWallet = await RiderWalletService.UpdateRiderWalletByCardId(request.body.coopId,request.body.cardId, decreaseAmountValue, increaseAmountValue, request.body.cardType, request.body.isNegative);
        response.status(200).json({messages : [{
            code: updateRiderWallet.status,
            message: updateRiderWallet.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response : updateRiderWallet.response
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