import TORFuelModel from "../models/TORFuelModel";

interface IFuel{
    coopId: string,
    UUID: string,
    device_id: string,
    control_no: string,
    tor_no: string,
    date_of_trip: string,
    bus_no: string,
    route: string,
    route_code: string,
    bound: string,
    trip_no: number,
    refuel_date: string,
    refuel_time: string,
    fuel_station: string,
    fuel_liters: number,
    fuel_amount: number,
    fuel_price_per_liter: number,
    fuel_attendant_id: number,
    fuel_attendant: string,
    full_tank: string,
    timestamp: string,
    lat: string,
    long:string,
    remarks: string
}

interface ITORFuel{
    portalData: {},
    recordId: string,
    modId: string
    fieldData: [IFuel]
}


class TORFuelRepository{

    async FindAndReplaceTORFuel(tor : any){

        try{

            const updateTORMain = await TORFuelModel.findOneAndReplace({"recordId" : tor.recordId} , tor, {upsert: true, new: true});

            return true;

        }catch(e){
            console.error("Error in find and replace repository: "+e);
            return false;
        }

    }

    async CreateTORFuel(tor : IFuel){
    
        try{
            const newTor = new TORFuelModel(tor);

            return  await newTor.save();

        }catch(e){
            console.error("Error in create tor repository: "+e);
            return false;
        }


    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORFuelModel.find({
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
    

    async GetAllTOURFuel(){
        
        try{

            const torFuel = await TORFuelModel.find({});

            return torFuel;

        }catch(e){
            console.error("Error in get all tor fuel repository: "+e);
            return {};
        }

    }
    async GetDataPerCoopId(coopId : string){
        try{

            const data = await TORFuelModel.find({"fieldData.coopId" : coopId})

            return data;

        }catch(e){
            console.log(`Error in repository: ${e}`)
            return null;
        }
    }



    async GetDataIsNotUploaded(coopId: string) {
        try {
            const data: any = await TORFuelModel.find({
                $or: [
                    { "fieldData.isUploaded": { $exists: false } },
                    { "fieldData.isUploaded": { $in: [null] } },
                ],
                "fieldData.coopId": coopId,
            });
    
            console.log(`DATA ${data}`);
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }

    async UpdateIsUploaded(id: string, isUpdate : boolean){
        try {
            // Find the document based on ticket_no
            const filter = { _id: id };
    
            // Set the update values
            const update = {
                $set: {
                "fieldData.isUploaded": isUpdate,
                },
               
            };
    
            // Options for findOneAndUpdate
            const options = {
                new: true, // Return the modified document rather than the original
            };
    
            // Perform the findOneAndUpdate operation
            const updatedDocument = await TORFuelModel.findOneAndUpdate(filter, update, options);
    
            // Check if a document was found and updated
            if (updatedDocument) {
                console.log("Document updated successfully:", updatedDocument);
                return true;
            } else {
                console.log("No document found with the given id:", id);
                return false;
            }
        } catch (e) {
            console.error("Error in repository:", e);
            return false;
        }
    }


}

export default new TORFuelRepository();