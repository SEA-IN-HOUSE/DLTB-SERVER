import StationModel, { IStation } from "../models/StationModel";

class StationRepository{

    async GetAllStation() : Promise<IStation[]>{
    
        try{

            const stations : any= await StationModel.find({});

            return stations;

        }catch(e : any ){
            return e;
        }

    }

    async GetAllStationSortedByRowNo(){
        try {
          const stations: any = await StationModel.aggregate([
            {
              $sort: {
                routeId: 1, // Sort by routeId in ascending order
                rowNo: 1,   // Then, sort by rowNo in ascending order
              },
            },
            {
              $group: {
                _id: '$routeId', // Group by routeId
                stations: { $push: '$$ROOT' }, // Push each document into the "stations" array
              },
            },
            {
              $project: {
                _id: 0, // Exclude the default "_id" field
                stations: 1, // Include the "stations" array
              },
            },
          ]);
      
          // Flatten the array of arrays into a single array
          const flattenedStations: any = [].concat(...stations.map((group : any) => group.stations));
      
          return flattenedStations;
        } catch (e: any) {
          return e;
        }
      }

    async AddStation( newStation : IStation){
    
        try{

            const station = new StationModel(newStation);

            return await station.save();

        }catch(e : any ){
            return e;
        }

    }

    async GetAllPerCoopId(coopId : string){

        try{

            const employee = await StationModel.find({'coopId' : coopId})

            return employee

        }catch(e){
           
            console.error("Repository error: "+e);
            return false;
            
        }

    }

    async GetDataPerCoopIdAndRouteId(coopId : string, routeId: string){

      try{

          const employee = await StationModel.find({'routeId':routeId,'coopId' : coopId})

          return employee

      }catch(e){
         
          console.error("Repository error: "+e);
          return false;
          
      }

  }

}

export default new StationRepository();