import TORTicketModel from "../models/TORTicketModel";

export interface ITORTicket{


        coopId: string,
        UUID: string,
        device_id: string,
        control_no : string,
        tor_no: string,
        date_of_trip: string,
        bus_no: string,
        route: string,
        route_code: string,
        bound: string,
        trip_no: number,
        ticket_no: string,
        ticket_type: string,
        ticket_status: string,
        timestamp: Date,
        from_place: string,
        to_place: string,
        from_km: number,
        to_km: number,
        km_run: number,
        fare: number,
        card_no: string,
        status: string,
        lat: string,
        long: string,
        created_on: Date,
        updated_on: Date,
        previous_balance: number,
        current_balance: number
   

}

interface QueryFilter {
    coopId: string;
    dateCreated:  any
    [key: string]: string | Date | { $gte: Date } | { $lte: Date } | undefined;
}


class TORTicketRepository{

    async GetAllTORTicket(){

        try{

            const torTickets = await TORTicketModel.find({});

            return torTickets;
            
        }catch(e){
            console.error("Error in repository: "+e)
            return false;
        }

    }

    async CreateTORTicket(torTicket : ITORTicket){

        try{

            const newTorTicket = new TORTicketModel(torTicket);

            const saveTorTicket = await newTorTicket.save();

            console.log(saveTorTicket)

            if(saveTorTicket.coopId){
                return saveTorTicket
            }else{
           return null
            }


            return saveTorTicket;

        }catch(e){
            console.error("Error in repository: "+e);
            return null;
        }

    }

    async FindOneAndReplacePerTicketNo(ticketNo : string, torTicket : ITORTicket){
        
        try{

            console.log(torTicket)

            const updateTORMain = await TORTicketModel.findOneAndReplace({"ticket_no" : ticketNo} , torTicket, {upsert: true, new: true});

            console.log(`Update TOR Main ${updateTORMain}`)

            return updateTORMain;

        }catch(e){
            console.error("Error in repository: "+e);
            return null;
        }

    }

    async FindDataByTicketNo(ticketNo : string){
        try{
            console.log(`TICKET NO ${ticketNo}`)
            const torTickets = await TORTicketModel.find({"ticket_no": ticketNo});

            return torTickets;
            
        }catch(e){
            console.error("Error in repository: "+e)
            return false;
        }
    }

    async FindOneAndReplaceTORTicket(tor : any){

        try{

            const updateTORMain = await TORTicketModel.findOneAndReplace({"UUID" : tor.UUID} , tor, {upsert: true, new: true});

            return true;

        }catch(e){
            console.error("Error in repository: "+e);
            return false;
        }

    }
    
    async FindOneAndUpdateAdditionalFareAndCurrentBalance(additionalFare : number , currentBalance : number, previousBalance: number, ticketNo : string) {
        try {
            // Find the document based on ticket_no
            const filter = { ticket_no: ticketNo };
    
            // Set the update values
            const update = {
                $set: {
                "additionalFare": additionalFare,
                "current_balance": currentBalance,
                "previous_balance": previousBalance,
                }
            };
    
            // Options for findOneAndUpdate
            const options = {
                new: true, // Return the modified document rather than the original
            };
    
            // Perform the findOneAndUpdate operation
            const updatedDocument = await TORTicketModel.findOneAndUpdate(filter, update, options);
    
            // Check if a document was found and updated
            if (updatedDocument) {
                console.log("Document updated successfully:", updatedDocument);
                return true;
            } else {
                console.log("No document found with the given ticket_no:", ticketNo);
                return false;
            }
        } catch (e) {
            console.error("Error in repository:", e);
            return false;
        }
    }

    async FindUUID(UUID: string){

        try{

            const findTorTicket = await TORTicketModel.findOne({"fieldData.UUID" : UUID});

            console.log(findTorTicket)

            // return true

        }catch(e){
            console.error("Error in repository: "+e);
            return false;
        }

    }

    async GetDataPerCoopId(coopId : string){

        try{

            const data = await TORTicketModel.find({"coopId" : coopId})
            
            return data;

        }catch(e){
            console.log(`Error in repository : ${e}`);
            return null;
        }

    }


    
    async GetDataPerCoopIdAndDateRange(coopId : string, fromDate : string, toDate : string) {
        try {
            const data = await TORTicketModel.find({
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

            console.log(`TODATE ${toDate}`)
            console.log(`FROM DATE ${fromDate}`)
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
    
            const data = await TORTicketModel.find(query);
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }
    


    
}

export default new TORTicketRepository();