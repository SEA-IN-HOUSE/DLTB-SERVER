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

}

export default new TORViolationRepository();