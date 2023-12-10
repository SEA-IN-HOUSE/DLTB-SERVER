import DirectionModel from "../models/DirectionModel";


interface IDirections{

    coopId: string,

    bound: string,

    origin: string,

    destination: string,

    code: string,

    minimum_fare: number,

    discount: number,

    pricePerKM:  number,

    first_km: number

}

class Directions{

    async GetAllDirections(){

        try{

            const directions = await DirectionModel.find();

                
            // directions.map(async (station : any) => {
               
            //     console.log(station)
                
            //     const updatedStation = await DirectionModel.findOneAndUpdate({_id : station.id} , station, {returnNewDocument: true});
            //   });

            return directions;

        }catch(e){
            console.error("Error in direction repository: "+e)
            return false;
        }
       
    }

    async AddNewDirection(direction : IDirections){
        
        try{

            const newDirection = new DirectionModel(direction);
            const saveNewDirection = await newDirection.save();

            return true;

        }catch(e){
            console.error("Error in direction repository: "+e);
            return false;
        }
    }

    async UpdateDataToCoopId(){

        try{

                await DirectionModel.updateMany({}, { coopId: "655321a339c1307c069616e9" });
                console.log("Successfully updated all direction records to have a coopId.");
            return true;
        }catch(e){
            console.error(`Error in repository ${e}`);
            return false;
        }
    }

    async GetAllPerCoopId(coopId : string){

        try{

            const employee = await DirectionModel.find({'coopId' : coopId})

            if(Object(employee).length > 0){
                return employee
            }else{
                return null
            }
           

        }catch(e){
           
            console.error("Repository error: "+e);
            return null;
            
        }

    }

}

export const directionRepo = new Directions();