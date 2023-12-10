import { ObjectId } from "mongodb";
import RiderWalletModel from "../models/RiderWalletModel";
const mongoose = require('mongoose');

export interface IRiderWallet{

    // _id : String,

    riderId: String,

    currencyId: String,

    address: String,

    privateKey: String,

    balance: number

}


class RiderWalletRepository{

    async GetAllRiderWallet(){

        try{

            const riderWallets = await RiderWalletModel.find({});

            console.log(riderWallets)

            return riderWallets;

        }catch(e){
            
            console.log(`Error in repository ${e}`);

            return e

        }

    }

    async AddRiderWallet( riderWallet : IRiderWallet ){

        try{

            const newRiderWallet = new RiderWalletModel(riderWallet);

            const saveNewRiderWallet = await newRiderWallet.save();

            return saveNewRiderWallet;

        }catch(e){
            console.log(`Error in repository ${e}`)
            return e
        }

    }

    async UpdateRiderWalletBalanceByCardId( cardId : string, decreaseAmount : Number, increaseAmount : Number ){

        try{

            const increaseBalancePerId = await RiderWalletModel.updateOne({"currencyId": cardId}, {$inc: {"balance": increaseAmount}} , {new: true});

            const decreaseBalancePerId = await  RiderWalletModel.updateOne({"currencyId": cardId}, {$inc: {"balance": -decreaseAmount}} , {new: true});

            return decreaseBalancePerId;

        }catch(e){

            console.log(`Error in repository ${e}`);
            return e;

        }

    }

    async UpdateRiderWalletByRiderId(riderId : string, increaseAmount : number, decreaseAmount : number){

        const newRiderId =  new ObjectId(riderId);

        try{

            console.log(`INCREASE ${increaseAmount}`)
            console.log(`DECREASE ${decreaseAmount}`)

            const fckShet = await RiderWalletModel.findOne({"riderId" : riderId});

            const increaseBalancePerId = await RiderWalletModel.findOneAndUpdate({"riderId": riderId}, {$inc: {"balance": increaseAmount}} , {new: true});

            const decreaseBalancePerId = await  RiderWalletModel.findOneAndUpdate({"riderId": riderId}, {$inc: {"balance": -decreaseAmount}} , {new: true});

            return decreaseBalancePerId;

        }catch(e){

            console.log(`Error in repository ${e}`);
            return e;

        }

    }

    async GetBalancePerRiderId(riderId : String, coopId : string){

        try{

            let balance = 0;
            const data = await RiderWalletModel.findOne({"riderId" : riderId, "coopId": coopId});
            
            if(typeof data?.balance === 'number'){
                balance = data.balance;
            }

            return balance;

        }catch(e){

            console.log(`Error in repository ${e}`);
            return 0;

        }
        
    }

    async GetRiderWalletByRiderId(riderId : String){
    
        try{

            const riderWallet = await RiderWalletModel.findOne({"riderId": Object(riderId)});

            return riderWallet;

        }catch(e){

            console.log(`Error in repository ${e}`);
            
            return e

        }

    }


    async FindCardInRiderWallet( cardId : string ) : Promise <IRiderWallet | boolean | string>{ 
    
        try{

 

            const searchCardId : any = await RiderWalletModel.findOne({"currencyId": cardId});

            console.log(searchCardId)

            if(searchCardId !== null){
                return searchCardId;
            }else{
                return false
            }

           

        }catch(e : any){
         
            console.log(`Error in repository ${e}`)
            let errorMessage: string = e.message;
            return errorMessage
        
        }

    }


}

export default new RiderWalletRepository()