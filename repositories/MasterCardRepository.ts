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

    async CreateNewMasterCard(masterCard: IMasterCard) {
        try {
            if (masterCard.balance <= 500000 && masterCard.balance >= 0) {
                const getData = (await masterCardModel.find({})).length + 1;
                const lastString = `000${getData}`.slice(-4); // Ensure the last 4 characters
        
                const currentYear = new Date().getFullYear();
    
                // SNO EXAMPLE = SNMC2023-0001
                const newSNo = `SNMC${currentYear}-${lastString}`;
    
                masterCard.sNo = newSNo;
    
                const newMasterCard = new masterCardModel(masterCard);
    
                const saveMasterCard = await newMasterCard.save();
    
                return true;
            } else {
                return 1;
            }
        } catch (e) {
            console.error("Error in repository: " + e);
            return null;
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

            console.log(`SEARCH CARD ID HERE: ${searchCardId}`)

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

    async UpdateMasterCardBalanceByCardId(cardId: string, decreaseAmount: number, increaseAmount: number, coopId: string) {
        try {
            const currentBalance = await this.GetCurrentBalancePerCardId(cardId, coopId);
    
            if (currentBalance !== null) {
                const newBalance = currentBalance - decreaseAmount + increaseAmount;
    
                if (newBalance <= 500000) {
                    const increaseBalancePerId = await masterCardModel.updateOne(
                        { "cardID": cardId, "coopId": coopId.trim() },
                        { $inc: { "balance": increaseAmount } },
                        { new: true }
                    );
    
                    const decreaseBalancePerId = await masterCardModel.updateOne(
                        { "cardID": cardId, "coopId": coopId.trim() },
                        { $inc: { "balance": -decreaseAmount } },
                        { new: true }
                    );
    
                    console.log(`MODIFIED COUNT ${decreaseBalancePerId.modifiedCount}`);
    
                    const numberOfModifiedAccount: number = decreaseBalancePerId.modifiedCount + increaseBalancePerId.modifiedCount;
    
                    return numberOfModifiedAccount;
                } else {
                    console.log("Balance limit exceeded.");
                    return "Balance limit exceeded";
                }
            } else {
                console.log("Card not found");
                return "Card not found";
            }
        } catch (e) {
            console.log(`Error in repository ${e}`);
            return e;
        }
    }
    

    async  UpdateField() {
        try {
          await masterCardModel.updateMany({}, { $rename: { 'cardID': 'cardID' } });+
          console.log('Field updated successfully.');
        } catch (error) {
          console.error('Error updating field:', error);
        }
      }




}

export default new MasterCardRepository();