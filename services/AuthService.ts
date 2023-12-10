import { CheckHashPassword } from "../common/Bcrypt";
import CardUserModel from "../models/CardUser";
import { ICardUser } from "../repositories/CardUserRepository";
import UserRepository from "../repositories/UserRepository";
import ActivityLogService from "./ActivityLogService";
import UserService from "./UserService";

interface IUserLogin{
    email : string,
    password: string,
}

class AuthService{

    async CheckIfCardUserMatch( data : ICardUser ){

        let isAuth = false;

        try{
            const getCardUserPerEmail = await CardUserModel.findOne({ username: data.username});

            if(getCardUserPerEmail){
               isAuth = await CheckHashPassword(data.password, getCardUserPerEmail.password);
            }
            return isAuth;
        }catch(e){
            console.error("Error in service: "+e)
            return false;
        }

    }

    async Auth( userData : IUserLogin ){
        console.log(userData)
        try{

            let isAuth = false;

            const isEmailExist = await UserRepository.CheckIfEmailExist(userData.email);

            if(isEmailExist) {

                const getUserWithHashedPassword : any = await UserRepository.GetUserPasswordByEmail(userData.email)
                console.log(getUserWithHashedPassword)
                const isPasswordMatched = await CheckHashPassword(userData.password , getUserWithHashedPassword.password)

                if(isPasswordMatched){

                    const data = {  
                        
                        "userId": getUserWithHashedPassword.id,
                        "coopId": getUserWithHashedPassword.companyId,
                        "action" : "Logged In",
                        "actionDescription" : `User ${getUserWithHashedPassword.firstName+" "+getUserWithHashedPassword.lastName} logged in`

                    }
                    await ActivityLogService.AddData(data)

                    return {status: 0, message: "OK", response: getUserWithHashedPassword}
                }else{
                    return {status: 1, message: "Password does not match", response: {}}
                }

            }else{
                return {status: 1, message: "Email does not exist", response: {}}
            }

        }catch(e){

            console.error("Error in service: "+e)
            return {status: 500, message: e, response: e}

        }

    }
 

}

export default new AuthService();