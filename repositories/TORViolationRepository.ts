import TORViolationModel from "../models/TORViolationModel";

export interface IViolation{

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

    trip_no: string,

    inspector_emp_no: string,

    inspector_emp_name: string,

    onboard_time: string,

    onboard_place: string,

    onboard_km_post: number,

    employee_name : string,
    
    employee_violation: string,

    timestamp: string,

    lat: string,

    isUpdated: boolean

    long: string
}

export interface ITORViolation{
    portalId: {},
    recordId: string,
    modId: string,
    fieldData: IViolation
}

class TORViolationRepository{

    async GetAllTorViolation(){

        try{

            const torInspection = await TORViolationModel.find({});

            return torInspection;

        }catch(e){

            console.error("Error in tor violation repository: "+e);
            return e;

        }

    }

    async GetDataPerCoopId(coopId : string){

        try{

            const data = await TORViolationModel.find({"fieldData.coopId" : coopId})

            return data;

        }catch(e){
            console.error(`Error in repository ${e}`);
            return null;
        }

    }

    async CreateTORViolation(fieldData : IViolation){
        
        try{

            const tor ={
                "portalId": {},
                "recordId": "",
                "modId": "",
                fieldData
            }

            const newTor = new TORViolationModel(tor);

            const saveTor = await newTor.save();

            return saveTor;

        }catch(e){

            console.error("Error in tor violation repository: "+e);

            return e;
        }

    }

    async  FilterTripDataPerCoopId(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {

        console.log(`CoopId :${coopId} , fromDate: ${fromDate}, toDate: ${toDate}, filterType: ${filterType}, filterData: ${filterData}`)
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
        
            const data = await TORViolationModel.find(query);
        
            return data;
          } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
          }
    }

    //SYNC
    async GetDataIsNotUploaded(coopId: string) {
        try {
            const data: any = await TORViolationModel.find({
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
            const updatedDocument = await TORViolationModel.findOneAndUpdate(filter, update, options);
    
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

export default new TORViolationRepository();