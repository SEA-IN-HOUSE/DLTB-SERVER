import VehicleModel from "../models/VehicleModel";


export interface IVehicle{

    vehicle_no: String,

    plate_no: String,

    route_code: String

}

class VehicleRepository{

    async GetAllVehicles(){

        try{

            const vehicles = await VehicleModel.find({})

            // vehicles.map(async (station : any) => {
               
            //     const updatedStation = await VehicleModel.findOneAndUpdate({_id : station.id} , station, {returnNewDocument: true});
                
            // });

            return vehicles;

        }catch(e){
            console.log(`Error in getting vehicles ${e}`)
            return e;
        }

    }

    async GetAllDataPerCoopId(coopId : string){

        try{

            const vehicles = await VehicleModel.find({"coopId" : coopId})

            return vehicles;

        }catch(e){
            console.log(`Error in getting vehicles ${e}`)
            return e;
        }

    }

    async AddVehicle( vehicle : IVehicle ){

        try{

            const newVehicle = new VehicleModel(vehicle);

            const saveVehicle = await newVehicle.save();

            return saveVehicle;

        }catch(e){
            console.log(`Error in adding vehicle ${e}`);
            return null;
        }

    }

}

export default new VehicleRepository();