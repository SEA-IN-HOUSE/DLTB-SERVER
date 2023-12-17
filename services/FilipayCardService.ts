import { IRider } from "../models/RiderModel";
import RiderWalletModel from "../models/RiderWalletModel";
import EmployeeCardRepository, { IEmployeeCard } from "../repositories/EmployeeCardRepository";
import RiderRepository from "../repositories/RiderRepository";
import RiderWalletRepository, { IRiderWallet } from "../repositories/RiderWalletRepository";
import { IMasterCard } from "../models/MasterCardModel";
import MasterCardRepository from "../repositories/MasterCardRepository";


export interface IFilipayCard{

   _id: string,
   cardID: string,
   balance: number,
   cardType: string,
   sNo: string,

}

class FilipayCardService{

    async GetAllData() {

        try {
          
            const result = await RiderWalletModel.aggregate([
                {
                  $lookup: {
                    from: 'rider',
                    localField: 'riderId',
                    foreignField: '_id',
                    as: 'riderInfo',
                  },
                },
                {
                  $unwind: '$riderInfo',
                },
                {
                  $project: {
                    _id: '$riderId',
                    cardID: '$riderInfo.cardId',
                    balance: '$balance',
                    sNo: '$riderInfo.sNo', 
                    cardType: {
                      $cond: {
                        if: { $eq: ['$balance', 0] },
                        then: 'regular',
                        else: {
                          $cond: {
                            if: { $eq: [{ $substr: ['$riderInfo.sNo', 0, 3] }, 'SNR'] },
                            then: 'regular',
                            else: 'discounted',
                          },
                        },
                      },
                    },
                  },
                },
              ]);
              
        
            return { status: 0, message: "OK", response: result };
          } catch (error) {
            console.error(error);
            return { status: 1, message: "ERROR", response: error };
          }
    }
    

    isMasterCard(card: IMasterCard | string | boolean): card is IMasterCard {
      return (card as IMasterCard).balance !== undefined;
   }
   
  isRiderCard(card: IRiderWallet | string | boolean): card is IRiderWallet {
      return (card as IRiderWallet).balance !== undefined;
  }

    async UpdateIncreaseMasterCardDecreaseFilipayCard(masterCardId : string , filipayCardId : string, amount : number, coopId: string){

      try{
        
        const findCardIdInMasterCard : any = await MasterCardRepository.FindCardIdInMasterCard(masterCardId, coopId);

        if(!findCardIdInMasterCard && !findCardIdInMasterCard.balance){
          
          return {status: 1, message: "Master card is not valid!", response: {}}
        }
    
        const filipayCardriderIdPerCardId : any = await RiderRepository.GetRiderByCardId(filipayCardId);

         
       if(!filipayCardriderIdPerCardId){
        return {status: 1, message: "Filipay card is not valid!", response: {}}
       }
        if(typeof filipayCardriderIdPerCardId === null || Object(filipayCardriderIdPerCardId).length === 0){
          return {status: 1, message: "Filipay is not valid", response: {}}
      }
        if(typeof filipayCardriderIdPerCardId === undefined){
          return {status: 1, message: "Filipay is not valid", response: {}}
      }

      const getBalanceForFilipayCard : number = await RiderWalletRepository.GetBalancePerRiderId(filipayCardriderIdPerCardId._id.toString());

      if(amount > findCardIdInMasterCard.balance){
        return {status: 1, message: "Insufficient Balance", response: {}}
      }


      const decreaseAmountInMasterCard = await MasterCardRepository.UpdateMasterCardBalanceByCardId(masterCardId,amount,0,coopId )

      if(decreaseAmountInMasterCard){

      const decreaseFilipayCard = await RiderWalletRepository.
      UpdateRiderWalletByRiderId(filipayCardriderIdPerCardId._id.toString(), amount, 0);

      const masterCardCurrentBalance = findCardIdInMasterCard.balance;

      const filipayCardCurrentBalance = getBalanceForFilipayCard;

      const masterCardNewBalance = masterCardCurrentBalance - amount;

      const filipayCardNewBalance = getBalanceForFilipayCard + amount;

      return {status: 0, message: "OK", response: {
        mastercard:{
          previousBalance: masterCardCurrentBalance,
          newBalance: masterCardNewBalance,
        },

        filipayCard :{
          previousBalance: filipayCardCurrentBalance,
          newBalance: filipayCardNewBalance,
        }
      }}

      }else{
        return {status: 500, message: "Internal Server Error", response: {}}
      }

      

      }catch(error){
        console.error(error);
        return { status: 1, message: "ERROR", response: error };
      }
    }

}

export default new FilipayCardService();