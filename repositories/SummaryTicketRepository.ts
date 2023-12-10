import SummaryTicketModel, { ISummaryTicket} from "../models/SummaryTicketModel";


class SummaryTicketRepository{

    async GetDataPerId( id : string){

        try{

            const data = await SummaryTicketModel.find({"id": id});

            return data

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return e;

        }


    }

    async GetAllData(){
        
        try{

            const data = await SummaryTicketModel.find({});

            return data

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return null;

        }
    }

    async AddData(data : ISummaryTicket){

        try{

            const newData = new SummaryTicketModel(data);


            return await newData.save();

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return null;

        }
    }

    async GetDataPerReferenceNo(referenceNo : string){

        try{

            const data = await SummaryTicketModel.find({"reference_no" : referenceNo});

            return data;

        }catch(e){

            console.log(`Error in repository: ${e}`)

            return null;

        }

    }


    async FilterGetData(fromDate: string | null, toDate: string | null, filterType: string | null, filterData: any | null) {
        try {
            let query: any = {
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
    
            const data = await SummaryTicketModel.find(query);
    
            return data;
        } catch (e) {
            console.error(`Error in repository: ${e}`);
            return null;
        }
    }

}

export default new SummaryTicketRepository();