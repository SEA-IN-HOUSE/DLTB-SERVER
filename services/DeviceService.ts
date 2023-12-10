import { IDevice } from "../models/DeviceModel";
import CooperativeRepository from "../repositories/CooperativeRepository";
import DeviceRepository from "../repositories/DeviceRepository"

class DeviceService{

    async GetData(){
        try{
            
            const data = await DeviceRepository.GetAllData();

            return {status: 0, message: "OK", response: data}

        }catch(e){

            console.log(`Error in get all dispatch service: ${e}`)
            return {status: 0, message: e, response: {}}
        }
    }

    async AddData(data : IDevice){

        try{

            const newData = await DeviceRepository.AddData(data);

            return {status: 0, message: "OK", response: newData}
        }catch(e){
            console.log(`Error in adding vehicle: ${e}`);
            return {status: 500, message: e, response: {}}
        }

    }

    async GetDataPerCoopId(coopId : string){
        try{

            const data = await DeviceRepository.GetCoopIdPerDeviceId(coopId);

            if(data !== null  && data !== "" ){
              
                return {status: 0, message: "OK", response: data}
               
            }else{
                
                return {status: 1, message: "Invalid device id", response: {}}
            }

        }catch(e){
            console.log(`Error in adding vehicle: ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }

    async GetDataPerDeviceId(deviceId : string){
        try{

            const data = await DeviceRepository.GetDataPerDeviceId(deviceId)

            if(data !== null || Object(data).length === 0 ){
              
                return {status: 0, message: "OK", response: data}
               
            }else{
                
                return {status: 1, message: "Invalid device id", response: {}}
            }

        }catch(e){
            console.log(`Error in adding vehicle: ${e}`);
            return {status: 500, message: e, response: {}}
        }
    }

}

export default new DeviceService();