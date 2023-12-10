import UserModel, { IUser } from "../models/UserModel";

class UserRepository {

    async GetAllUser(){

        try{

            const users = await UserModel.find({});

            return users

        }catch(e){

            console.log(`Error in getting vehicles ${e}`)

            return e;

        }

    }

    async GetCardByCoopId(coopId: string){
        try{
          
            const data : any = await UserModel.find({"companyId" : coopId});

            return data;

        }catch(e){
            console.error("Error in master card repository: "+e);
            return false;
        }
    }

    async GetUserById (id : String){

        try{

            const user = await UserModel.findOne({ "_id" : id })

            return user
        }catch(e){

            console.log(`Error in getting repository: ${e}`)

            return e

        }

    }

    async AddUser( newUser : IUser ){

        try{

            const addUser = new UserModel(newUser);

            return await addUser.save();

        }catch(e){

            console.log(`Error in getting repository: ${e}`)

            return e

        }

    }

    async CheckIfEmailExist (email : string){

        try{

            const user = await UserModel.findOne({"email" : email})

            return user;

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return e

        }

    }



    async GetUserPasswordByEmail ( email : string ){

        try{

            const user = await UserModel.findOne({"email" : email})

            return user
            
        }catch(e){


            console.log(`Error in repository: ${e}`)

            return e

        }

    }

    async UpdateUser ( id : string, user : IUser ){
    
        try{

            const updateUser = await UserModel.findByIdAndUpdate(id, {
                $set: user,
              }, {
                new: true,
              });
            return updateUser;

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return e

        }

    }

    async GetUserByEmail(email : string){

        try{

            const user = await UserModel.findOne({"email" : email})

            return user
            
        }catch(e){


            console.log(`Error in repository: ${e}`)

            return null;

        }

    }

}

export default new UserRepository();