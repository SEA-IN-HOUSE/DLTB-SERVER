import TORMainModel from "../models/TORMainModel";

interface ITORMAIN{

    fieldData : {
        coopId: string,
        UUID: string,
        
        device_id: string,
        
        control_no: string,
        
        tor_no: string,
        
        date_of_trip: string,
        
        bus_no: string,
        
        route: string,
        
        route_code: string,
        
        emp_no_driver_1: string,
        
        emp_no_driver_2: string,
        
        emp_no_conductor: string,
        
        emp_name_driver_1: string,
        
        emp_name_driver_2: string,
        
        emp_name_conductor: string,
        
        eskirol_id_driver: string,
        
        eskirol_id_conductor: string,
        
        eskirol_name_conductor: string,
        
        no_of_trips: number,
        
        ticket_revenue_atm: number,
        
        ticket_count_atm : number,
        
        ticket_revenue_atm_passenger: number,
        
        ticket_revenue_atm_baggage: number,
        
        ticket_count_atm_passenger: number,
        
        ticket_count_atm_baggage: number,
        
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
        
        commission_driver1_passenger: string,
        
        auto_comission_driver1_passenger: number,
        
        commission_driver1: number,
        
        auto_commission_driver1: number,
        
        commission_driver2_passenger: string,
        
        auto_commission_driver2_passenger: number,
        
        commission_driver2_baggage: string,
        
        auto_commission_driver2_baggage: number,
        
        commission_driver2: number,
        
        auto_commission_driver2: string,
        
        commission_conductor_passenger: string,
        
        auto_commission_conductor_passenger: number,
        
        commission_conductor_baggage: string,
        
        auto_commission_conductor_baggage: number,
        
        commission_conductor: number,
        
        auto_commission_conductor: number,
        
        incentive_driver1: number,
        
        incentive_driver2: number,
        
        incentive_conductor: number,
        
        allowance_driver1: number,
        
        allowance_driver2: number,
        
        allowance_conductor: number,
        
        eskirol_commission_driver: number,
        
        eskirol_commission_conductor: number,
        
        eskirol_cash_bond_driver: number,
        
        eskirol_cash_bond_conductor: number,
        
        toll_fees: number,
        
        parking_fee: number,
        
        diesel : number,
        
        diesel_no_of_liters: number,
        
        other: number,
        
        services: number,
        
        callers_fee: number,
        
        employee_benefits: number,
        
        repair_maintenance: number,
        
        materials: number,
        
        representation: number,
        
        total_expenses: number,
        
        net_collections: number,
        
        total_cash_remitted: number,
        
        final_remittance: number,
        
        final_cash_remitted: number,
        
        overage_shortage: number,
        
        tellers_id: string,
        
        tellers_name: string,
        
        coding: string,

        isUploaded: boolean,
        
        remarks: string
    }
     
        
}

class TORMainRepository{

    async GetAllTORMain(){

        try{

            const torMain = await TORMainModel.find({});

            return torMain;

        }catch(e){
            console.error("Error in tor main repository: "+e)
            return {};
        }


    }

    async GetDataPerCoopId(coopId : string){
        
        try{

            const data = await TORMainModel.find({"coopId" : coopId})

            return data;

        }catch(e){
            console.error(`Error in repository : ${e}`);
            return null;
        }

    }

    async CreateNewTORMain( newTor : any ){

        try{
            
            const newTormain = new TORMainModel(newTor);
            
            const SaveNewTorMain = newTormain.save();

            return true;
        }catch(e){
            console.error("Error in repository: "+e)
            return false;
        }

    }

    async SearchTORMainPerUUID(UUID: string){

        try{

            const findTorMain = await TORMainModel.find({"fieldData.UUID" : UUID})
            console.log(findTorMain)
            return findTorMain;

        }catch(e){
            console.error("Error in repository: "+e);
            return {};
        }
    }

    async UpdateTORMainPerUUID(tor : ITORMAIN){
        try{

            const updateTORMain = await TORMainModel.findOneAndReplace({"UUID" : tor.fieldData.UUID} , tor.fieldData);

            return true;

        }catch(e){
            console.error("Error in repository: "+e);
            return false;
        }
    }

    async UpdateDataPerTorNo(torNo: string, remittedAmount : number){
        
        try{
            console.log(`TOR NO ${torNo}`)
            console.log(`REMITTED AMOUNT: ${remittedAmount}`)

            const updateData = await TORMainModel.updateOne({"tor_no": torNo}, {"final_remittance": remittedAmount} , {new: true});

            console.log(`Update the data ${JSON.stringify(updateData)}`)

            return updateData.modifiedCount;
        }catch(e){

            console.error("Error in repository: "+e);
            return 0;
        }

    }

    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORMainModel.find({
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
    
            const data = await TORMainModel.find(query);
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }

    async GetDataPerTorNo(torNo: string){

        try {
            const data : any= await TORMainModel.find({
                "tor_no": torNo
            });
            console.log(`TORMAIN data: ${data}, TORNO: ${torNo}`)
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }

    }

    async GetDataIsNotUploaded(coopId : string){
        try {
            const data : any= await TORMainModel.find({
                "isUploaded": false, "coopId": coopId 
            });
          console.log(`DATA ${data}`)
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
                "isUploaded": isUpdate,
                },
               
            };
    
            // Options for findOneAndUpdate
            const options = {
                new: true, // Return the modified document rather than the original
            };
    
            // Perform the findOneAndUpdate operation
            const updatedDocument = await TORMainModel.findOneAndUpdate(filter, update, options);
    
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

export default new TORMainRepository();