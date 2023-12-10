import DispatchRepository, { IDispatch } from "../repositories/DispatchRepository";


class DispatchService{

    async GetAllDispatch(){

        try{
            
            const dispatches = await DispatchRepository.GetAllDispatch();

            return {status: 0, message: "OK", response: dispatches}

        }catch(e){

            console.log(`Error in get all dispatch service: ${e}`)
            return {status: 0, message: e, response: {}}
        }

    }

    async AddDispatch(newDispatch : IDispatch){

        try{

            const dispatch = await DispatchRepository.AddDispatch(newDispatch);

            return {status: 0, message: "OK", response: dispatch}

        }catch(e){
            console.log(`Errro in adding new dispatch: ${e}`);
             return {status: 500, message: e, response: {}}

        }

    }

}

export default new DispatchService();