import { GenerateHashPassword } from "../common/Bcrypt";
import { ICooperativeEmployee, ICooperativeEmployeeSchema } from "../models/CooperativeEmployeeModel";
import CooperativeEmployeeRepository from "../repositories/CooperativeEmployeeRepository";

class CooperativeEmployeeService{

    async GetAllCooperativeEmployee(){

        try{

            const allCooperativeEmployee = await CooperativeEmployeeRepository.GetAllCooperativeEmployee();

            return {status: 0, message: "OK", response: allCooperativeEmployee}

        }catch(e){

            console.log(`Error in getting vehicle services: ${e}`)

            return {status: 500, message: e, response: {}}

        }

    }

    async AddCooperativeEmployee(data: ICooperativeEmployeeSchema){

        try{
            
            const hashedPassword = await GenerateHashPassword(data.password)

            const userAccount : ICooperativeEmployeeSchema = {...data , "password" : hashedPassword}

           const saveUser = await CooperativeEmployeeRepository.AddCooperativeEmployee(userAccount)

        //    const saveUser = await CooperativeEmployeeRepository.AddCooperativeEmployee(data)

            return {status: 0, message: "OK", response: saveUser}

        }catch(e){

            console.log(`Error in getting vehicle services: ${e}`)

            return {status: 500, message: e, response: {}}


        }

    }


}

export default new CooperativeEmployeeService();