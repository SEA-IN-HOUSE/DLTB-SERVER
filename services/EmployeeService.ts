import { ConvertCurrentDateOnly } from "../common/GetCurrentDate";
import { IEmployeeData } from "../models/EmployeeModel";
import { employeeRepo } from "../repositories/EmployeeRepository";

class EmployeeService{

    async AddData(data : IEmployeeData){

        
        try{
            
            

            let ifAllowed  = await employeeRepo.FindByCoopIdAndEmpNo(data.coopId, data.empNo);

            if(ifAllowed === null){

                let convertDate = new Date(ConvertCurrentDateOnly(data.JTI_RFID_RequestDate))

                const convertedDate  = {...data, "JTI_RFID_RequestDate" : ""+convertDate}

                const newData = await employeeRepo.AddEmployee(convertedDate);

                return {status: 0, message: "OK", response: newData}
                

            }else{
                return {status: 1, message: "Employee no already exist!", response: {}}
            }

           

        }catch(e){

            console.error("Error in tor services: "+e);
            return {status: 500, message: e, response: {}}

        }


    }

    async GetDataPerCoopId(coopId : string){
        try{

            const data = await employeeRepo.GetAllPerCoopId(coopId);

            console.log(`Data : ${data}`)

            return {status: 0, message: "OK", response: data}

        }catch(e){
            console.error("Error in services: "+e);
            return {status: 500, message: e, response: {}}
        }
    }
}

export default new EmployeeService();