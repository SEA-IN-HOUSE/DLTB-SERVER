import  EmployeeCardRepository, { IEmployeeCard } from "../repositories/EmployeeCardRepository";


class EmployeeCardService{

    async GetAllEmployeeCard(){

        try{
            
            const allEmployeeCard = await EmployeeCardRepository.GetAllEmployeeCard();

            return {status: 0, message: "OK", response: allEmployeeCard}
    

        }catch(e){

            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}

        }

    }

  

    async RegisterNewEmployeeCard( newEmployeeCard : IEmployeeCard){

        try{

            const saveNewEmployeeCard = await EmployeeCardRepository.RegisterEmployeeCard(newEmployeeCard);

            return {status: 0, message: "OK", response: saveNewEmployeeCard}

        }catch(e){

            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}

        }

    }

    async GetAllCardPerCoopId( coopId : string ){
        
        try{
            // const swap = await EmployeeCardRepository.SwapEmpNoToCardId();
            const data = await EmployeeCardRepository.GetAllDatPerCoopId(coopId);

            if(Object(data).length > 0){
                return {status: 0, message: "OK", response: data}
            }else{
                return {status: 1, message: "Invalid Coop Id", response: {}}
            }

           
        }catch(e){

            console.log(`Error in getting services: ${e}`)

            return {status: 500, message: e, response: {}}

        }
    }

}

export default new EmployeeCardService();