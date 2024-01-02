import {Request, Response} from 'express'
import { GetCurrentDateSTR } from '../common/GetCurrentDate';


export async function UploadFileController(request: Request, response : Response){
    try{
        let fileUrl = ""

        if (!request.file || request.file.filename !== undefined) {
            response.status(200).json({messages : [{
                code: 1,
                message: "No file uploaded",
                dateTime: GetCurrentDateSTR(),
                }],
                response : {}
            })
          }else{

            fileUrl = request.protocol + '://' + request.get('host') + '/data/uploads/' + request.file.filename;
            
          }
       
        response.status(200).json({messages : [{
            code: 0,
            message: "OK",
            dateTime: GetCurrentDateSTR(),
            }],
            response : {fileUrl: fileUrl}
        })

    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: 1,
            message: ""+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }
}

