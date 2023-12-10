import moment from "moment";
import { IEmailOTP } from "../models/EmailOTPModel";
import { emailOTPRepository } from "../repositories/EmailOTPRepository";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../models/UserModel";
import generateOTP from "../common/OTP";

class EmailOTPService{

    async GetAllData(){

        
        try{
            
            const data = await emailOTPRepository.GetAll();

            return {status: 0, message: "OK", response: data}

        }catch(e){

            console.log(`Error in get all service: ${e}`)
            return {status: 0, message: e, response: {}}
        }

    }

    async AddData(email : string){

        try{

         const user : any = await UserRepository.GetUserByEmail(email);

           if(user?.email !== undefined){

            const otp = generateOTP();

            const newOtp = await emailOTPRepository.AddData(email, otp)

            return {status: 0, message: "OK", response: {}}

           }else{

            return {status: 1, message: "Email does not exist", response: {}}

           }
           
    
        }catch(e){

            console.log(`Error in adding new data: ${e}`);
             return {status: 500, message: e, response: {}}

        }

    }

    async ValidateOtp(otp : string, email : string){

        try{

            const getOtpData : Array<IEmailOTP> | null = await emailOTPRepository.GetDataPerEmail(email);

            if(getOtpData !== null){

                if(getOtpData[0]?.otpValue === otp){

                    const isOtpValid = await this.CheckOtpValidity(getOtpData[0]?.dateOfExpiration);

                    if(isOtpValid){

                        const deleteOtp = await emailOTPRepository.DeleteDataPerId(getOtpData[0]?.id);

                        return {status: 0, message: "OK", response: {}}

                    }else{

                        return {status: 1, message: "OTP Already expired", response: {}}

                    }
                   
                }else{
                    return {status: 1, message: "Invalid OTP", response: {}}
                }

            }else{
                return {status: 1, message: "Invalid OTP", response: {}}
            }

        }catch(e){
            console.log(`Error in validating otp: ${e}`);
             return {status: 500, message: e, response: {}}

        }

    }

    async CheckOtpValidity( otpExpiration : Date ){

        try{

            const validUntil =  await moment(otpExpiration);

            const currentDate = await moment();

            if (validUntil.isAfter(currentDate) || validUntil.isSame(currentDate)) {

                return true

            } else {

                return false

            }

        }catch(e){

            console.log(`Error in repository ${e}`);

            return false

        }

    }

}

export default new EmailOTPService();