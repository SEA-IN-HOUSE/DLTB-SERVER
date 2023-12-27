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

interface QueryFilter {
    coopId: string;
    dateCreated:  any
    [key: string]: string | Date | { $gte: Date } | { $lte: Date } | undefined;
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

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await DirectionModel.find({
                "coopId": coopId,
                "dateCreated": {
                    $gte: new Date(fromDate), // $gte means "greater than or equal to"
                    $lte: new Date(toDate)    // $lte means "less than or equal to"
                }
            });
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }

    async FilterGetDataPerCoopId(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
        try {

            console.log(`TODATE ${toDate}`)
            console.log(`FROM DATE ${fromDate}`)
            let query: any = {
                coopId: coopId,
            };

    
            if (fromDate !== null && toDate !== null) {
                query.dateCreated = {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate),
                };
            }
    
            if (filterType !== null && filterData !== null && filterType !== "None" && filterData !== "") {
                query[filterType] = filterData;
            }
    
            const data = await DirectionModel.find(query);
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }
    

    
  async  UpdateById(id: string, newData : any) {
    try {
        // Use updateOne to update a single document that matches the criteria
        const result = await DirectionModel.updateOne(
            { _id : id },
            { $set: newData }
        );

        // Check if any documents were matched and updated
        if (result.modifiedCount > 0) {
            console.log(`Successfully updated station id ${id} `);
            return true;
        } else {
           
            return false;
        }
    } catch (e) {
        console.error("Repository error: " + e);
        return false;
    }
  }

async  DeleteById(id : string) {
  try {
      // Use deleteOne to delete a single document by its ID
      const result = await DirectionModel.deleteOne({ '_id': id });

      // Check if any documents were matched and deleted
      if (result.deletedCount > 0) {

          return true;
      } else {
 
          return false;
      }
  } catch (e) {
      console.error("Repository error: " + e);
      return false;
  }
}

}

export const directionRepo = new Directions();