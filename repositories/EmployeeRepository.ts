
import EmployeeModel from "../models/EmployeeModel";

import { IEmployeeData } from "../models/EmployeeModel";
class EmployeeRepository{

    async GetAllEmployee(){
        try{

            const employees = await EmployeeModel.find({})

            return employees;
        }catch(e){
            console.error("Repository error: "+e);
            return false;
        }
    }
    
    async UpdateEmployeeById(id : string, data: IEmployeeData){
        try{

            return await EmployeeModel.findByIdAndUpdate(id, data, {new: true});

        }catch(e){
            console.error("Repository error: ",e)
        }
    }

    async AddEmployee( data : IEmployeeData){

        try{

            const employeeData = new EmployeeModel(data);
            const employeeDataSave = await employeeData.save();

            
            return true;

        }catch(e){
            
            console.error("Repository error: ",e);
            return false;

        }

    }

    async UpdateEmployeePerEMPNo ( data : IEmployeeData) {
    
        try{

            const employee = await EmployeeModel.findOneAndReplace({'empNo' : data.empNo}, data )

        }catch(e){
            console.error("Error in employee repository: "+e);
            return true;
        }

    }

    async GetEmployeePerEmpNo (id : number) : Promise<any>{

        try{
 
            const employee = await EmployeeModel.findOne({'empNo' :id})

            return employee
        }catch(e){
            console.error("Repository error: "+e);
            return false;
        }

    }

    async CheckIfEmployeePerNoExist(id : IEmployeeData) : Promise<boolean>{
        try{
            let ifAllowedToAdd = false;
            const employee = await EmployeeModel.findOne({'empNo' :id})

            if(employee === null){
                ifAllowedToAdd = true;
            }

            if(ifAllowedToAdd === true){
                return true;
            }else{
                return false;
            }
        }catch(e){
            
            console.error("Repository error: "+e);
            return false;
        }
    }


    async UpdateEmployeePerEmpNo(data : any) : Promise<boolean>{
       
        try{
            
            const updateEmployeeData = await EmployeeModel.findOneAndUpdate({'empNo' :data.empNo}, data)

            return true;
        }catch(e){
           
            console.error("Repository error: "+e);
            return false;
        }

    } 

    async GetAllPerCoopId(coopId : string){

        try{

            const employee = await EmployeeModel.find({'coopId' : coopId})

            return employee

        }catch(e){
           
            console.error("Repository error: "+e);
            return false;
            
        }

    }

    async FindByCoopIdAndEmpNo(coopId : string, empNo : number){
        
        try{
       
            const employee = await EmployeeModel.findOne({'empNo' :empNo, 'coopId' : coopId})

            if(employee){
                return employee;
            }else{
                return null;
            }

        }catch(e){
            
            console.error("Repository error: "+e);
            return null;
        }
    }
}

export const employeeRepo = new EmployeeRepository();