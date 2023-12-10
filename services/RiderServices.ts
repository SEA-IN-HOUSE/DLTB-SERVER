import { IRider } from "../models/RiderModel";
import RiderRepository from "../repositories/RiderRepository";


class RiderServices { 

    async GetRiderByCardId( cardId : String){

        try{

            const rider : any = await RiderRepository.GetRiderByCardId(cardId)

            if(rider.length > 0){


                return {status: 0, message: "OK", response: rider}
            }else{
                return {status: 0, message: "NOT FOUND", response: rider}
            }

            

        }catch(e){
            console.log(`Error in rider wallet services : ${e}`)
            return {status: 500, message: e, response: {}}
        }

    }

    async GetAllRider(){

        
        try{

            const riders = await RiderRepository.GetAllRider();

            return {status: 0, message: "OK", response: riders}
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);

            return {status: 500, message: e, response: {}}
        }


    }

    async AddRiderWallet( rider : IRider ){

        try{
            
            const newRider = await RiderRepository.AddRider(rider);

            return {status: 0, message: "OK", response: newRider}
        }catch(e){
            console.log(`Error in rider wallet services: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }


}

export default new RiderServices();