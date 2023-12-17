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

    async GetAllStationSortedByRowNo() {
      try {
        const stations: any = await StationModel.aggregate([
          {
            $group: {
              _id: '$routeId', // Group by routeId
              stations: { $push: '$$ROOT' }, // Push each document into the "stations" array
            },
          },
          {
            $sort: {
              '_id': 1, // Sort by routeId in ascending order
            },
          },
          {
            $unwind: '$stations', // Unwind the stations array
          },
          {
            $replaceRoot: { newRoot: '$stations' }, // Replace the root with the stations document
          },
          {
            $sort: {
              rowNo: 1, // Sort by rowNo in ascending order
            },
          },
          {
            $project: {
              _id: 0, // Exclude the default "_id" field
            },
          },
        ]);
    
        return stations;
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

  async UpdateRowNoById(id: string, newRowNo: number, coopId: string) {
    try {
      // Find the station to update
      const stationToUpdate = await StationModel.findOne({ _id: id, coopId });
  
      if (!stationToUpdate) {
        console.log("STATION NOT FOUND");
        throw new Error('Station not found');
      }
  
      // Check if the new rowNo already exists
      const stationWithNewRowNo = await StationModel.findOne({
        routeId: stationToUpdate.routeId,
        rowNo: newRowNo,
        _id: { $ne: stationToUpdate._id },
      });
  
      // Sort stations by rowNo
      const stationsToAdjust = await StationModel.find({
        routeId: stationToUpdate.routeId,
      }).sort({ rowNo: 1 });
  
      if (stationWithNewRowNo) {
        // If the new rowNo already exists, adjust the existing stations and update the current station
        for (const station of stationsToAdjust) {
          if (station.rowNo >= newRowNo && station._id.toString() !== stationToUpdate._id.toString()) {
            station.rowNo += 1;
            await station.save();
          }
        }
  
        stationToUpdate.rowNo = newRowNo;
        await stationToUpdate.save();
      } else {
        // If the new rowNo doesn't exist, simply update the current station
        stationToUpdate.rowNo = newRowNo;
        await stationToUpdate.save();
      }
  
      return stationToUpdate;
    } catch (error) {
      console.error(`Error in repository: ${error}`);
      return null;
    }
  }
  
  

}

export default new StationRepository();