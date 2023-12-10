import masterCardModel, { IMasterCard } from "../models/MasterCardModel";





class MasterCardRepository{

    async GetAllMasterCard(){

        try{

            const masterCard : any = await masterCardModel.find({});

            return masterCard;

        }catch(e){
            console.error("Error in master card repository: "+e);
            return false;
        }
    }

    async GetCardByCoopId(coopId: string){
        try{
            const update = await this.UpdateField();
            const masterCard : any = await masterCardModel.find({"coopId" : coopId});

            return masterCard;

        }catch(e){
            console.error("Error in master card repository: "+e);
            return false;
        }
    }

    async CreateNewMasterCard(masterCard : IMasterCard){
        
        try{

            const newMasterCard = new masterCardModel(masterCard);

            const saveMasterCard = await newMasterCard.save();

            return true;

        }catch(e){
            console.error("Error in repository: "+e);
            return e;
        }

    }

    async FindCardIdInMasterCard( cardId : string , coopId : string) : Promise<IMasterCard | boolean | string> {
    
        try{

            console.log(`COOP ID  ${coopId}`)
            const searchCardId : IMasterCard | null = await masterCardModel.findOne({ "cardID": cardId, "coopId": coopId });

            console.log(searchCardId)
            if(searchCardId){
                return searchCardId;
            }else{
                return false;
            }


        }catch(e : any){
            console.log(`Error in repository ${e}`)

            let errorMessage: string = e.message;
            return errorMessage;
        }

    }

    async GetCurrentBalancePerCardId( cardId : string ,coopId: string){

        try{

            const searchCardId : IMasterCard | null = await masterCardModel.findOne({ "cardID": cardId, "coopId": coopId });


            if(searchCardId){
                return searchCardId.balance;
            }else{
                return null;
            }


        }catch(e : any){
            console.log(`Error in repository ${e}`)

            let errorMessage: string = e.message;
            return null;
        }

    }

    async UpdateMasterCardBalanceByCardId( cardId : string, decreaseAmount : Number, increaseAmount : Number, coopId: string){

        try{
            console.log(`INCREASE ${increaseAmount}`)
            console.log(`DECREASE ${decreaseAmount}`)
            console.log(`CARD ID ${cardId}`)
            console.log(`COOP ID ${coopId}`)

            const increaseBalancePerId = await masterCardModel.updateOne({"cardID": cardId, "coopId": coopId.trim()}, {$inc: {"balance": increaseAmount}} , {new: true});

            const decreaseBalancePerId = await  masterCardModel.updateOne({"cardID": cardId, "coopId" :coopId.trim()}, {$inc: {"balance": -decreaseAmount}} , {new: true});

            console.log(`MODIFIED COUNT ${decreaseBalancePerId.modifiedCount}`)
            
            return decreaseBalancePerId.modifiedCount;

        }catch(e){

            console.log(`Error in repository ${e}`);
            return e;

        }

    }

    async  UpdateField() {
        try {
          await masterCardModel.updateMany({}, { $rename: { 'cardID': 'cardID' } });
          console.log('Field updated successfully.');
        } catch (error) {
          console.error('Error updating field:', error);
        }
      }


}

export default new MasterCardRepository();