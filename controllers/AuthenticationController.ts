import { Request, Response, NextFunction } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

interface IAuthResponse{
    status: number,
    message: string,
}

export async function AuthenticationController(request: Request, response: Response){

    const responseDate = GetCurrentDateSTR();
  

    try{
        
        const authUser = await AuthService.Auth(request.body);

        if(authUser.status === 0){
            const token = request.body.email;
           response.cookie('authToken',token, {
            httpOnly: true,
            maxAge: 3600000,
            //sameSite: "none", // You can uncomment this if needed
            secure: false, // Set to false for HTTP in a local environment
            path: '/',
            domain: 'localhost', // Set to the appropriate domain
        })
         response.status(200).json({messages : [{
                code: "0",
                message: "OK",
                dateTime: GetCurrentDateSTR(),
                }],
                response : authUser.response
            })
        }else{
            response.status(201).json({messages : [{
                code: authUser.status,
                message: authUser.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: authUser.response
            })
        }

        

    }catch(e){
        console.error("Error in authentication controller " + e);
      
        response.status(500).json({messages : [{
            code: "212",
            message: "Authentication failed!",
            dateTime: responseDate,
        }]});
    }

}

export async function GetUserByEmailController(request : Request, response : Response){

    try{

        const user = await UserService.GetUserByEmail(request.params.email);

        if(user.status === 0){
          
         
         response.status(200).json({messages : [{
                code: "0",
                message: "OK",
                dateTime: GetCurrentDateSTR(),
                }],
                response : user.response
            })
        }else{
            response.status(201).json({messages : [{
                code: user.status,
                message: user.message,
                dateTime: GetCurrentDateSTR(),
                }],
                response: user.response
            })
        }



    }catch(e){
        console.error("Error in authentication controller " + e);
      
        response.status(500).json({messages : [{
            code: "212",
            message: "Authentication failed!",
            dateTime: GetCurrentDateSTR(),
        }]});
    }

}