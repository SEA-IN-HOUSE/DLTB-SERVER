import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import TORTicketServices from "../services/TORTicketServices";
import RiderWalletService from "../services/RiderWalletService";

export async function CreateTorTicketWithWalletBalanceController(request : Request, response: Response ){
 
    const decreaseAmountValue : number =  request.body.amount? request.body.amount : 0;
    
    try{

        const ticketData = await TORTicketServices.FindDataByTicketNo(request.body.items.ticket_no);
     
        if(ticketData.status !== 0 && ticketData.status !== undefined && ticketData.status !== 500){

            const updateRiderWallet = await RiderWalletService.UpdateRiderWalletByCardId(request.body.items.coopId, request.body.cardId, decreaseAmountValue, 0, request.body.cardType, request.body.isNegative);

            if(updateRiderWallet.status === 0){

                const newData = request.body.items;

                newData.previous_balance = updateRiderWallet.response.previousBalance;

                newData.current_balance = updateRiderWallet.response.newBalance;

                let data : any = await TORTicketServices.InsertTORTickeToOurDBServices(newData)

               if(data.status === 0){

                response.status(200).json({messages : {
                    code: data.status,
                    message: data.message,
                    dateTime: GetCurrentDateSTR(),
                },
                response: data.response
                });
               }else{
                response.status(200).json({messages : {
                    code: 1,
                    message: "Failed to update in tor ticket, but balance was updated",
                    dateTime: GetCurrentDateSTR(),
                },
                response: {}
                });
               }
    
            }else{
 
                response.status(200).json({messages : {
                    code:updateRiderWallet.status,
                    message: updateRiderWallet.message,
                    dateTime: GetCurrentDateSTR(),
                },
                response: {}
                });
            }

        }else{
            console.log("pumasok dito")
            response.status(200).json({messages : {
                code:1,
                message: "Ticket Number Already Exist!",
                dateTime: GetCurrentDateSTR(),
            },
            response: {}
            });
        }

    }catch(e){
        console.error("Error in tor main controller: "+e)
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}


export async function UpdateTORTicketPerTicketNoController(request : Request, response: Response ){

    const decreaseAmountValue : number =  request.body.amount? request.body.amount : 0;

    let additionalFare : number = request.body.items.additionalFare? request.body.items.additionalFare : 0;
  
    try{
      
        const ticketData : any = await TORTicketServices.FindDataByTicketNo(request.params.id);
      
        if(ticketData.status === 0){
         
            additionalFare  = additionalFare + decreaseAmountValue;
        
            const updateRiderWallet = await RiderWalletService.UpdateRiderWalletByCardId(request.body.items.coopId, request.body.cardId, decreaseAmountValue, 0, request.body.cardType, request.body.isNegative);

            if(updateRiderWallet.status === 0){

                const _newBalance : any = updateRiderWallet.response.newBalance;
                const _previousBalance : any  = updateRiderWallet.response.previousBalance;
                const _ticketNo : any = request.body.items.ticket_no;
<<<<<<< HEAD
                const _additionalFareCardType : any = request.body.items.additionalFareCardType;
                // newData.previous_balance = updateRiderWallet.response.previousBalance;
                // newData.current_balance = updateRiderWallet.response.newBalance;
    
                // const data : any = await TORTicketServices.FindOneAndReplacePerTicketNo(request.params.id, newData)
                

                const data : any = await TORTicketServices.FindOneAndUpdateAdditionalFareAndCurrentBalance(additionalFare,  _newBalance, _previousBalance, _ticketNo,_additionalFareCardType)
=======
 
                const data : any = await TORTicketServices.FindOneAndUpdateAdditionalFareAndCurrentBalance(additionalFare,  _newBalance, _previousBalance, _ticketNo)
>>>>>>> 045945ef34acdb2e5431434c21c05fd9809d71d8

                if(data.status === 0){

                    response.status(200).json({messages : {
                        code: data.status,
                        message: data.message,
                        dateTime: GetCurrentDateSTR(),
                    },
                    response: data.response
                    });
                   }else{
                    response.status(200).json({messages : {
                        code: 1,
                        message: "Failed to update in tor ticket, but balance was updated",
                        dateTime: GetCurrentDateSTR(),
                    },
                    response: {}
                    });
                }
    
            }else{
          
                response.status(200).json({messages : {
                    code:updateRiderWallet.status,
                    message: updateRiderWallet.message,
                    dateTime: GetCurrentDateSTR(),
                },
                response: {}
                });
            }

        }else{
       
            response.status(200).json({messages : {
                code:1,
                message: "Invalid Ticket No",
                dateTime: GetCurrentDateSTR(),
            },
            response: {}
            });
        }

    }catch(e){
        console.error("Error in tor main controller: "+e)
        response.status(500).json({messages : {
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: GetCurrentDateSTR(),
            },
            response: {}
        })
    }

}

export async function GetTORTicketMainByCoopIdAndDateController(request: Request, response: Response){

    try{
        const data : any = await TORTicketServices.GetDataPerCoopIdAndDateRange(request.params.id, request.body.fromDate, request.body.toDate);
        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });
    }catch(e){
        console.error("Error in tor main controller: "+e)
        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}

export async function GetAllTicketController(request: Request, response: Response){
    
    const responseDate = GetCurrentDateSTR();
    
    try{

        const torTickets = await TORTicketServices.GetAllTORTicketService();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: torTickets
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}

export async function SyncGetAllTicket(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const torTicket = await TORTicketServices.SyncGetAllTORTicketService();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
            }],
            response: torTicket
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in getting employees: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
        
    }

}

export async function CreateTorTicketController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const insertTicketToDb = await TORTicketServices.InsertTORTickeToOurDBServices(request.body);

        response.status(200).json({messages : [{
            code: insertTicketToDb.status,
            message: insertTicketToDb.message,
            dateTime: responseDate,
            }],
            response: insertTicketToDb.response
        })

 }catch(e){
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Internal server error: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })

    }

}

export async function SyncTORTicketController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();

    try{

        const syncTorTicket = await TORTicketServices.SyncTORTicketService();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: responseDate,
        }],
        response: syncTorTicket
        });

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Error in creating tor ticket: "+e,
            dateTime: responseDate,
            }],
            response: {}
        })
    }

}


export async function GetTORTicketPerCoopIdController(request : Request, response : Response){

    try{

        const data = await TORTicketServices.GetDataPerCoopId(request.params.id);

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "212",
            message: "Internal Server Error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}



export async function GetTorTicketByCoopIdAndFilterController(request : Request, response : Response){

    try{

        const data = await TORTicketServices.FilterGetDataPerCoopId(request.params.id, request.body.fromDate, request.body.toDate, request.body.filterType, request.body.filterData)

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
        }],
        response: data.response
        });

    }catch(e){
        response.status(500).json({messages : [{
            code: "500",
            message: "Internal server error: "+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }
}


export async function SyncToFileMakerTORTicketController(request: Request, response : Response){

    try{

      
 
        const updateTORMain = await TORTicketServices.SyncDataByCoopid(request.params.coopId)
 
         response.status(200).json({messages : [{
             code: updateTORMain.status,
             message: updateTORMain.message,
             dateTime: GetCurrentDateSTR(),
         }],
         response: {}
         });

     }catch(e){
         console.error("Error in tor main controller: "+e)
         response.status(500).json({messages : [{
             code: "212",
             message: "Error in syncing tors: "+e,
             dateTime: GetCurrentDateSTR(),
             }],
             response: {}
         })
     }
 

}