import TORInspectionModel from "../models/TORInspectionModel";

export interface IInspection{
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

    onboard_place: string,

    onboard_km_post: number,

    offboard_time: string,

    offboard_place: string,

    offboard_km_post: string,

    ticket_no_beginning: string,

    ticket_no_ending: string,

    passenger_count_paid: string,

    passenger_count_with_pass: string,

    passenger_count_transfer: string,

    passenger_count_total: number,

    actual_count: number,

    total_discrepancy: number,

    remarks: string,

    lat: string,

    long: string,

    timestamp: string
}

export interface ITORInspection{
    portalData: {},
    recordId: string,
    modId: string,
    fieldData: IInspection
}

class TORInspectionRepository{

    async GetAllTORInspection(){

        try{

            const torInspection = await TORInspectionModel.find({});

            return torInspection;

        }catch(e){

            console.error("Error in tor inspection repository: "+e);
            return e;

        }

    }

    async CreateTORInspection(fieldData: IInspection){
        
        try{
            console.log(fieldData)
            
            const tor ={
                "portalId": {},
                "recordId": "",
                "modId": "",
                fieldData
            }

            console.log(tor)
            const newTOR = new TORInspectionModel(tor);

            const saveTorInspection = await newTOR.save();

            return saveTorInspection;

        }catch(e){

            console.error("Error in tor inspection repository: "+e);

            return e;
        }

    }

    async GetDataPerCoopId(coopId : string){
        try{
            const data = await TORInspectionModel.find({"fieldData.coopId":coopId});

            return data;

        }catch(e){
            console.log(`Error in repository: ${e}`)
            return null;
        }
    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORInspectionModel.find({
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


    async  FilterDataPerCoopIdAndDate(coopId: string, fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
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
        
            const data = await TORInspectionModel.find(query);
        
            return data;
          } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
          }
    }

    

}

export default new TORInspectionRepository();