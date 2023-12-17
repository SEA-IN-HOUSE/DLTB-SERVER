import TORRemittanceModel from "../models/TORRemittanceModel";

export interface IRemittance{
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
    
    remittance_date: string,

    remittance_time: string,

    remittance_place: string,

    remittance_amount: number,

    remittance_type: string,

    ctr_no: string,

    waybill_ticket_no: string,

    cashier_emp_no: string,

    cashier_emp_name: string,

    lat: string,

    long: string,

    remarks: string,

    timestamp: string

}

export interface ITORRemittance{
    portalData: {},
    recordId: string,
    modId: string,
    fieldDate: IRemittance
}

class TORRemittanceRepository{

    async FindOneAndReplaceRemittance(torRemittance: ITORRemittance){

        try{

            const updateTor = await TORRemittanceModel.findOneAndReplace({"recordId" : torRemittance.recordId} , torRemittance, {upsert: true, new: true});

            return true;

        }catch(e){
            console.error("Error in find and replace repository: "+e);
            return false;
        }

    }


    async GetAllTORRemittance(){
    
        try{
            
            const torRemittance = await TORRemittanceModel.find({});

            return torRemittance;

        }catch(e){
            console.error("Error in get all tor remittance repository: "+e);
            return false;
        }

    }

    async GetDataPerCoopId(coopId : string){
        try{

            const data = await TORRemittanceModel.find({"fieldData.coopId" : coopId})

            return data;

        }catch(e){
            console.error(`Error in repository ${e}`);
            return null;
        }
    }

    async CreateTORRemittance(newTorRemittance : IRemittance){
        
        try{
            console.log(newTorRemittance)
            const torRemittance = new TORRemittanceModel(newTorRemittance);

            const saveRemittance = await torRemittance.save();
            return saveRemittance;

        }catch(e){
            console.error("Error in create tor remittance repository: "+e);
            return false;
        }

    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORRemittanceModel.find({
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


    async  FilterDataPerCoopId(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {

        console.log(`TODATE ${toDate}`)
        console.log(`FROM DATE ${fromDate}`)
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
        
            const data = await TORRemittanceModel.find(query);
        
            return data;
          } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
          }
    }


    
    //SYNC
    async GetDataIsNotUploaded(coopId: string) {
        try {
            const data: any = await TORRemittanceModel.find({
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
            const updatedDocument = await TORRemittanceModel.findOneAndUpdate(filter, update, options);
    
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

export default new TORRemittanceRepository();