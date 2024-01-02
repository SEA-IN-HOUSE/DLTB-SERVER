import CooperativeModel, { ICooperative } from "../models/CooperativeModel";

class CooperativeRepository{

    async GetAllData(){
        try{

            const data = await CooperativeModel.find({});

            return data;

        }catch(e){

            console.error("Error in  repository: "+e)
            return null;

        }
    }

    async AddData(data : ICooperative){

        try{

            const newData = new CooperativeModel(data);

            return await newData.save();

        }catch(e){

            console.error("Error in  repository: "+e)
            return false;

        }

    }

    async GetDataPerId(id : string){
        try{

            const data = await CooperativeModel.findOne({"_id" : id});
            console.log(data)
            return data;

        }catch(e){

            console.error("Error in  repository: "+e)
            return null;

        }
    }

    async  UpdateById(id: string, newData : any) {
        try {
         
            // Use updateOne to update a single document that matches the criteria
            const result = await CooperativeModel.updateOne(
                { _id : id },
                { $set: newData }
            );
    
            // Check if any documents were matched and updated
            if (result.modifiedCount > 0) {
                return true;
            } else {
               
                return false;
            }
        } catch (e) {
            console.error("Repository error: " + e);
            return false;
        }
      }


    

}

export default new CooperativeRepository()