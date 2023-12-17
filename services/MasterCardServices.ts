import axios from "axios";
import MasterCardRepository from "../repositories/MasterCardRepository";
import { IMasterCard } from "../models/MasterCardModel";

class MasterCardServices{

    async GetAllMasterCard(){
        
        try{

            const masterCards = await MasterCardRepository.GetAllMasterCard();

            return masterCards;

        }catch(e){
            console.error("Error in master card services: "+e)
            return false;
        }

    }

    async GetAllMasterCardByCoopId( coopId : string){
        
        try{

            const masterCards = await MasterCardRepository.GetCardByCoopId(coopId);
            
            

            return masterCards;

        }catch(e){
            console.error("Error in master card services: "+e)
            return false;
        }

    }


    async CreateNewMasterCard( masterCard : IMasterCard ){

        try{

            const newMasterCard : any = await MasterCardRepository.CreateNewMasterCard(masterCard);

            if(newMasterCard.code === 11000){
                return { status: 1, message: "Error duplicate field value", response: {} };
              
            }
            
            if(newMasterCard === 1){
            
                return { status: 1, message:"Balance must between 0 - 500000", response: {} };
            }

            if(!newMasterCard){
           
                return { status: 1, message: "Invalid Fields!", response: {} };
            }

            if(newMasterCard === true){
                return { status: 0, message: "OK", response: newMasterCard };
            }

        }catch(e){
            console.error("Error in master card services: "+e);
            return { status: 500, message: ""+e, response: {} };
        }


    }

}

export default new MasterCardServices();