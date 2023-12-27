import TORTripModel from "../models/TORTripModel"

export interface ITrip{

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

    departed_place: string,

    departed_time: string,

    departed_dispatcher_id: string,

    departed_dispatcher: string,

    arrived_place: string,

    arrived_time: string,

    arrived_dispatcher_id: string,

    arrived_dispatcher: string,

    from_km: number,

    to_km: number,

    km_run: number,

    ticket_revenue_atm: number,

    ticket_count_atm: number,

    ticket_revenue_atm_passenger: number,

    ticket_revenue_atm_baggage: number,

    ticket_count_atm_passenger: number,

    ticket_revenue_punch: number,

    ticket_count_punch: number,

    ticket_revenue_punch_passenger: number,

    ticket_revenue_punch_baggage: number,

    ticket_count_punch_passenger: number,

    ticket_count_punch_baggage: number,

    ticket_revenue_charter: number,

    ticket_count_charter: number,

    ticket_revenue_waybill: number,

    ticket_count_waybill: number,

    ticket_revenue_card: string,

    ticket_count_card: string,

    ticket_revenue_reserved: string,

    ticket_count_reserved: string,

    ticket_amount_cancelled: number,

    ticket_count_cancelled: number,

    ticket_amount_passes: string,

    ticket_count_passes: string,

    passenger_revenue: number,

    baggage_revenue: number,

    gross_revenue: number,

    passenger_count: number,

    baggage_count: number,

    departure_timestamp: string,

    departure_lat: string,

    departure_long: string

}

class TORTripRepository{

    async GetAllTORTrip(){

        try{

            const torTrips = await TORTripModel.find({});

            return torTrips;

        }catch(e){
            console.error("Error in generating tor trips repository: "+e);

            return e;
        }

    }

    async AddNewTORTrip(fieldData : ITrip){

        try{

  
            const tor ={
                "portalId": {},
                "recordId": "",
                "modId": "",
                fieldData
            }

            console.log(tor)
            const newTOR = new TORTripModel(tor);

            const saveTOR = await newTOR.save();

            return saveTOR;

        }catch(e){
            console.error("Error in adding new tor trip: "+e);
            return e;
        }

    }

    async FindOneAndReplaceTORTrip(torTrip : ITrip){
        try{

            const findTorAndReplace = await TORTripModel.findOneAndReplace({"fieldData.UUID" : torTrip.UUID}, torTrip, {upsert: true, new: true});

            return findTorAndReplace;

        }catch(e){
            console.error("Error in finding and replacing tor: "+e);
            return e;
        }
    }

    async GetDataPerCoopId(coopId : string){
        
        try{

            const data = await TORTripModel.find({"fieldData.coopId" : coopId});

            return data;

        }catch(e){
            console.log(`Error in repository ${e}`)
            return null;
        }
    }

    async  UpdateDataPerControlNo(control_no: string, data: ITrip) {
        try {
            const updateData = {
                portalId: {},
                recordId: '',
                modId: '',
                fieldData: data
            };
    
            const newData = await TORTripModel.findOneAndReplace(
                { "fieldData.control_no": control_no },
                updateData,
                {
                    new: true,
                }
            );
    
            return newData;
        } catch (e) {
            console.log(`Error in repository ${e}`);
            return null;
        }
    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORTripModel.find({
                "fieldData.coopId": coopId,
                "fieldData.dateCreated": {
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



    async  FilterTripDataPerCoopId(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
        try {
            let query : any = {
              "fieldData.coopId": coopId,
            };
        
            if (fromDate !== null && toDate !== null) {
              query["fieldData.dateCreated"] = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
              };
            }
        
            if (filterType !== null && filterData !== null && filterType !== "None" && filterData !== "") {
              query[`fieldData.${filterType}`] = filterData;
            }
        
            const data = await TORTripModel.find(query);
        
            return data;
          } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
          }
    }


    //SYNC
    async GetDataIsNotUploaded(coopId: string) {
        try {
            const data: any = await TORTripModel.find({
                $or: [
                    { "fieldData.isUploaded": { $exists: false } },
                    { "fieldData.isUploaded": { $in: [null, false] } },
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
            const filter = { "fieldData._id": id };
    
            // Set the update values
            const update = {
                $set: {
                "fieldData.$.isUploaded": isUpdate,
                },
               
            };
    
            // Options for findOneAndUpdate
            const options = {
                new: true, // Return the modified document rather than the original
            };
    
            // Perform the findOneAndUpdate operation
            const updatedDocument = await TORTripModel.findOneAndUpdate(filter, update, options);
    
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

export default new TORTripRepository();