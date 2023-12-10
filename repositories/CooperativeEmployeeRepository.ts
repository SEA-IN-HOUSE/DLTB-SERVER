import CooperativeEmployeeModel, { ICooperativeEmployee, ICooperativeEmployeeSchema } from "../models/CooperativeEmployeeModel";

class CooperativeEmployeeRepository{

    async GetAllCooperativeEmployee(){
    
        try{

            const result = await CooperativeEmployeeModel.find({});

            return result;

        }catch(e){
            console.log(`Error in repository: ${e}`)

            return e;
        }

    }

    async AddCooperativeEmployee(data: ICooperativeEmployeeSchema){

        try{

            const employee = new CooperativeEmployeeModel(data);

            return await employee.save();

        }catch(e){
            console.log(`Error in repository: ${e}`);
            return e;
        }

    }

}

export default new CooperativeEmployeeRepository();