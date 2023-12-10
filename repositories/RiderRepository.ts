import RiderModel, { IRider } from "../models/RiderModel"


class RiderRepository{

    async GetAllRider(){

        try{

            const riders = await RiderModel.find({})
            return riders;

        }catch(e){
            console.log(`Error in repository: ${e}`)

            return e
        }

    }

    async AddRider(rider : IRider){

        try{

            const newrider = new RiderModel(rider)

            const saveRider = await newrider.save();

            return saveRider;

        }catch(e){
            console.log(`Error in repository ${e}`)
            return e
        }

    }

    

    async GetRiderByCardId(cardId : String) : Promise<any>{

        try{

            const rider = await RiderModel.findOne({"cardId" : cardId})

            return rider;

        }catch(e){
            console.log(`Error in repository ${e}`)
            return null
        }

    }

    async GetRiderByEmployeeNo(empNo : number) : Promise<any>{

        try{

            const rider = await RiderModel.findOne({"empNo" : empNo})

            return rider;

        }catch(e){
            console.log(`Error in repository ${e}`)
            return null
        }

    }
}

export default new RiderRepository();