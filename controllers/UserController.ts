import {Request, Response } from 'express'
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import UserService from '../services/UserService';

export async function UpdateUserByIdController(request : Request, response : Response){

    try{

        const updateUser = await UserService.UpdateUser(request.params.id, request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : updateUser.response
        })



    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })

    }

}

export async function GetAllUserController(request : Request, response: Response){

    try{

        const allUsers = await UserService.GetAllUser();

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : allUsers.response
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })

    }

}

export async function GetUserByCompanyIdController( request : Request, response : Response){

    try{

        const user = await UserService.GetAllByCompanyId(request.params.id)

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : user.response
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })

    }

}


export async function GetUserByIdController( request : Request, response : Response){

    try{

        const user = await UserService.GetUserById(request.params.id)

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : user.response
        })

    }catch(e){

        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })

    }

}

export async function AddUserContorller(request : Request, response: Response){

    
    try{

        const newStation = await UserService.AddUser(request.body);

        response.status(200).json({messages : [{
            code: "0",
            message: "OK",
            dateTime: GetCurrentDateSTR,
            }],
            response : newStation.response
        })
    }catch(e){
        
        console.error("Error in controller: "+e);

        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR,
            }],
            response: {}
        })
    }

}

