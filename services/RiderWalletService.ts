import { IMasterCard } from "../models/MasterCardModel";
import MasterCardRepository from "../repositories/MasterCardRepository";
import RiderRepository from "../repositories/RiderRepository";
import RiderWalletRepository, { IRiderWallet } from "../repositories/RiderWalletRepository";


class RiderWalletService {

    async GetAllRiderWallet(){

        try{

            const riderWallets = await RiderWalletRepository.GetAllRiderWallet();

            return {status: 0, message: "OK", response: riderWallets}
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);

            return {status: 500, message: e, response: {}}
        }

    }

    async AddRiderWallet( riderWallet : IRiderWallet ){

        try{
            
            const newRiderWallet = await RiderWalletRepository.AddRiderWallet(riderWallet)

            return {status: 0, message: "OK", response: newRiderWallet}
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }

    isMasterCard(card: IMasterCard | string | boolean): card is IMasterCard {
        return (card as IMasterCard).balance !== undefined;
    }

    isRiderCard(card: IRiderWallet | string | boolean): card is IRiderWallet {
        return (card as IRiderWallet).balance !== undefined;
    }


    async GetBalancePerCardId( cardId : string, cardType : string, coopId: string){
        
        console.log(`COOP ID ${coopId}`)
        try{

            if(cardType === "regular" || cardType === "discounted" || cardType === "mastercard"){

                if(cardType === "mastercard"){

                    const findCardIdInMasterCard : IMasterCard | string | boolean = await MasterCardRepository.FindCardIdInMasterCard(cardId, coopId);

                    if(!findCardIdInMasterCard){
                        console.log(`pumasok dito ${findCardIdInMasterCard}`)
                        return {status: 1, message: "Card is not yet registered", response: {}}
                    }

                    if(this.isMasterCard(findCardIdInMasterCard)){

                        return {status: 0, message: "OK", response: {"balance" : findCardIdInMasterCard.balance}}

                    }else{

                        return {status: 1, message: "Card is not valid", response: {}}

                    }

                }

                if(cardType === "regular" || cardType === "discounted"){
                   console.log("pumasok dito")
                    const riderIdPerCardId : any = await RiderRepository.GetRiderByCardId(cardId);  
                    
                    if(!riderIdPerCardId){
                        return {status: 1, message: "Card is not yet registered", response: {}}
                    }
                    
                    if(typeof riderIdPerCardId === null || Object(riderIdPerCardId).length === 0){
                        return {status: 1, message: "Card is not valid", response: {}}
                    }
             
                    if(typeof riderIdPerCardId._id !== undefined && riderIdPerCardId._id !== undefined && riderIdPerCardId !== null && riderIdPerCardId._id !== null ){
                       
                        let riderId : string = riderIdPerCardId._id.toString();
                     
                        if(cardType === "discounted" && riderIdPerCardId.sNo.substring(0, 3).toUpperCase() !== "SND"){
                            return {status: 1, message: "Card is not valid", response: {}}
                        }

                        if(cardType === "regular" && riderIdPerCardId.sNo.substring(0, 3).toUpperCase() !== "SNR"){
                            return {status: 1, message: "Card is not valid", response: {}}
                        }

                        const getBalancePerRiderId : number = await RiderWalletRepository.GetBalancePerRiderId(riderId, coopId);

                        return {status: 0, message: "OK", response: {"balance" : getBalancePerRiderId}}

                    }else{
                       
                        return {status: 1, message: "Card is not valid", response: {}}
                    }

                   
                }

    
            }else{
                return {status: 1, message: "Invalid Card Type", response: {}}
            }
            
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }

    async UpdateRiderWalletByCardId( coopId: string, cardId : string, decreaseAmount : number, increaseAmount : number, cardType : String, isNegative : boolean ){
        console.log(`coopId : ${coopId}`)
        try{
           
            if(cardId !== undefined  && decreaseAmount !== null && increaseAmount !== null && cardType !== undefined && coopId !== undefined ){

                
                if(cardType === "mastercard"){
                
                    const findCardIdInMasterCard : IMasterCard | string | boolean = await MasterCardRepository.FindCardIdInMasterCard(cardId,coopId);

                    const currentBalance  = await MasterCardRepository.GetCurrentBalancePerCardId(cardId,coopId);

                    if(typeof isNegative !== "boolean"){
                        return {status: 1, message: "Invalid fields for isNegative", response: {}}
                    }
                    
                    if(this.isMasterCard(findCardIdInMasterCard) ){
                        
                        // decrease = 0
                        // increase = 1000
                        console.log("HERE")
                        if(decreaseAmount <=  findCardIdInMasterCard.balance || isNegative === true || decreaseAmount === 0){
                            const updateBalance : any = await MasterCardRepository.UpdateMasterCardBalanceByCardId(cardId, decreaseAmount, increaseAmount, coopId);
                      

                            if(updateBalance > 0){
                                const newBalance  = await MasterCardRepository.GetCurrentBalancePerCardId(cardId,coopId);
                                return {status: 0, message: "OK", response: {
                                    "previousBalance" : currentBalance,
                                    "newBalance" : newBalance
                                }}
                            }else{
                                return {status: 1, message: "Card is not valid", response: {}}
                            }
                           
                        }else{
    
                            return {status: 1, message: "Insufficient balance", response: {}}

                        }
                           
                    
                        
                    }else{
                    
                        return {status: 1, message: "Card is not valid", response: {}}
                    }

                }

                if(cardType === "discounted" || cardType === "regular"){
                    

                    const riderIdPerCardId : any = await RiderRepository.GetRiderByCardId(cardId);              
                    
                    if(typeof riderIdPerCardId === undefined || typeof riderIdPerCardId._id === undefined){
                       
                        return {status: 1, message: "Card is not valid", response: {}}
                    }
                
                    if(riderIdPerCardId._id !== undefined && riderIdPerCardId !== null ){
                        
                        let riderId : string = riderIdPerCardId._id.toString();

                        if(cardType === "discounted" && riderIdPerCardId.sNo.substring(0, 3).toUpperCase() !== "SND"){
                           
                            return {status: 1, message: "Card is not valid", response: {}}
                        }

                        if(cardType === "regular" && riderIdPerCardId.sNo.substring(0, 3).toUpperCase() !== "SNR"){
                            console.log(`TEST : ${riderIdPerCardId}`)
                            return {status: 1, message: "Card is not valid", response: {}}
                        }

                        const getBalancePerRiderId : number = await RiderWalletRepository.GetBalancePerRiderId(riderId,coopId);
            

                        if(decreaseAmount <=  getBalancePerRiderId|| isNegative === true || decreaseAmount === 0){
                               const updateBalancePerRiderId = await RiderWalletRepository.
                            UpdateRiderWalletByRiderId(riderId, increaseAmount, decreaseAmount);

                            const newBalancePerRiderId : number = await RiderWalletRepository.GetBalancePerRiderId(riderId,coopId);
                            
                            return {status: 0, message: `OK`, response: {
                                "previousBalance" : getBalancePerRiderId,
                                "newBalance" : newBalancePerRiderId
                            }}
                        }else{
    
                            return {status: 1, message: "Insufficient balance", response: {}}

                        }

                    }else{
                       
                        return {status: 1, message: "Card is not valid", response: {}}
                    }
                
                }else{
                    return {status: 1, message: "Card is not valid", response: {}}
                }

            }else{
                
                return {status: 1, message: "Invalid fields", response: {}}
            }
            
           
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }
    

    async GetRiderWalletCardIdPerId( cardId : string){

        try{


            const FindCardInRiderWallet = await RiderWalletRepository.FindCardInRiderWallet(cardId);

            if(this.isRiderCard(FindCardInRiderWallet)){
                return {status: 0, message: "OK", response: FindCardInRiderWallet}
            }else{
                return {status: 1, message: "Card does not exist", response: {}}
            }

        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }

}

export default new RiderWalletService()