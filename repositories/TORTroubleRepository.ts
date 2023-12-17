import TORTroubleModel from "../models/TORTroubleModel";
import TORTripRepository from "./TORTripRepository";

export interface ITrouble{
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
    inspector_emp_no: string,
    inspector_emp_name: string,
    onboard_time: string,
    onboard_place:string,
    onboard_km_post:number,
    trouble_description:string,
    timestamp: string,
    isUpdated: boolean,
    lat: string,
    long: string

}

export interface ITORTrouble{
    portalId: {},
    recordId: string,
    modId: string,
    fieldData: ITrouble
}

class TORTroubleRepository{

    async GetAllTor(){

        try{

            const torInspection = await TORTroubleModel.find({});

            return torInspection;

        }catch(e){

            console.error("Error in tor  repository: "+e);
            return e;

        }

    }

    async CreateTOR(fieldData : ITrouble){
        
        try{

            const tor ={
                "portalId": {},
                "recordId": "",
                "modId": "",
                fieldData
            }
            console.log(tor)
            const newTor = new TORTroubleModel(tor);

            const saveTor = await newTor.save();

            return saveTor;

        }catch(e){

            console.error("Error in tor  repository: "+e);

            return e;
        }

    }

    async GetDataPerCoopId(coopId : string ){

        try{

            const data = await TORTroubleModel.find({"fieldData.coopId":coopId});

            return data;
            
        }catch(e){
            console.log(`Error in repository ${e}`)
            return null
        }

    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORTroubleModel.find({
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

    //SYNC
    async GetDataIsNotUploaded(coopId: string) {
        try {
            const data: any = await TORTroubleModel.find({
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
            const updatedDocument = await TORTroubleModel.findOneAndUpdate(filter, update, options);
    
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

export default new TORTroubleRepository();