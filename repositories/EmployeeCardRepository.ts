import EmployeeCardModel from "../models/EmployeeCards"
import { IRider } from "../models/RiderModel";

export interface IEmployeeCard{
    id : string,
    coopId: string,
    sNo: string,
    empNo : string,
    cardId : string, 

}

class EmployeeCardRepository{

    async GetAllEmployeeCard() {

        try{

            const employeeCards = await EmployeeCardModel.find({});

            return employeeCards;

        }catch(e){
            console.error("Error in employee repository: "+e)
            return null;
        }

    }

    async GetAllDatPerCoopId(coopId : string){
        try{

            const employeeCards = await EmployeeCardModel.find({"coopId" : coopId});

            // employeeCards.map(async (station : any) => {
               
            //     const updatedStation = await EmployeeCardModel.findOneAndUpdate({_id : station.id} , station, {returnNewDocument: true});
                
            // });

            return employeeCards;

        }catch(e){
            console.error("Error in employee repository: "+e)
            return e
        }
    }

    async RegisterEmployeeCard( employeeCard : IEmployeeCard){

        try {
        
              const getData = (await EmployeeCardModel.find({})).length + 1;
              const lastString = `000${getData}`.slice(-4); // Ensure the last 4 characters
      
              const currentYear = new Date().getFullYear();
  
              // SNO EXAMPLE = SNMC2023-0001
              const newSNo = `SNMC${currentYear}-${lastString}`;
  
              employeeCard.sNo = newSNo;
  
              const newMasterCard = new EmployeeCardModel(employeeCard);
  
              const saveMasterCard = await newMasterCard.save();
  
              return true;
         
      } catch (e) {
          console.error("Error in repository: " + e);
          return null;
      }

    }
  
    async SwapEmpNoToCardId() {
        try {
          const cards = await EmployeeCardModel.find({});
      
          if (cards && cards.length > 0) {
            const updatePromises = cards.map(async (card) => {
              const empNo = card.cardId;
              const cardId = card.empNo;
      
              // Use updateOne without await, just return the promise
              return EmployeeCardModel.updateOne({ "_id": card._id }, { "empNo": cardId, "cardId": empNo });
            });
      
            // Wait for all update operations to complete
            await Promise.all(updatePromises);
      
            console.log("Swap successful");
          } else {
            console.log("No cards found");
          }
        } catch (e) {
          console.error("Error in repository:", e);
        }
      }
      

}

export default new EmployeeCardRepository();