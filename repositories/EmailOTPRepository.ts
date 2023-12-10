import mongoose from "mongoose";
import EmailOTPModel, { IEmailOTP } from "../models/EmailOTPModel";


class EmailOTPRepository{

    async GetAll(){

        try{

            const data : Array<IEmailOTP> = await EmailOTPModel.find({});

            return data;

        }catch(e){
            console.error(`Error in repository : ${e}`);

        }

    }

    async AddData(email : string, otp : string){

        try{
    

            const newData = new EmailOTPModel({"email" : email, "otpValue" : otp});

            return await newData.save();

        }catch(e){
            console.error(`Error in repository ${e}`)
            return e;
        }

    }

    async GetDataPerEmail(email : string){

        try{

            const data : Array<IEmailOTP> | null = await EmailOTPModel.find({"email" : email});

            return data;

        }catch(e){
            console.error(`Error in repository ${e}`)
            return null;
        }

    }

    async DeleteDataPerId( id : string ){

        try{

            const data = await EmailOTPModel.findByIdAndDelete(id);

            return data;

        }catch(e){
            console.error(`Error in repository ${e}`);
            return null;
        }

    }

}

export const emailOTPRepository = new EmailOTPRepository();