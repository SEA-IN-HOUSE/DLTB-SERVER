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


    

}

export default new CooperativeRepository()