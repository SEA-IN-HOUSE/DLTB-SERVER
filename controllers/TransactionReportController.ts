import {Request, Response} from 'express'
import TransactionReportService from '../services/TransactionReportService';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';
import multer from 'multer';

export async function GetAllTransactionReportController(request : Request , response: Response){

    try{

        const data = await TransactionReportService.GetAllData();

        response.status(200).json({messages : [{
            code: data.status,
            message: data.message,
            dateTime: GetCurrentDateSTR(),
            }],
            response: data.response
        })
    }catch(e){
        console.error("Error in controller: "+e);
        response.status(500).json({messages : [{
            code: "1",
            message: ""+e,
            dateTime: GetCurrentDateSTR(),
            }],
            response: {}
        })
    }

}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    },
  });
  
  const upload = multer({ storage: storage }).single('file'); // 'file' should match the field name in the form
  

  export async function AddDataTransactionReportController(request: Request, response: Response) {
    try {
      upload(request, response, async function (err) {
        if (err) {
          console.error('Error uploading file: ' + err);
          return response.status(500).json({
            messages: [
              {
                code: "1",
                message: 'Error uploading file: ' + err,
                dateTime: GetCurrentDateSTR(),
              },
            ],
            response: {},
          });
        }
  
        let fileUrl = '';
  
        if (!request.file) {
          return response.status(200).json({
            messages: [
              {
                code: 1,
                message: 'No file uploaded',
                dateTime: GetCurrentDateSTR(),
              },
            ],
            response: {},
          });
        } else {
          fileUrl = request.protocol + '://' + request.get('host') + '/data/uploads/' + request.file?.filename;
  
          const data = await TransactionReportService.AddData(request.body, fileUrl);
  
          response.status(200).json({
            messages: [
              {
                code: data.status,
                message: data.message,
                dateTime: GetCurrentDateSTR(),
              },
            ],
            response: data.response,
          });
        }
      });
    } catch (e) {
      console.error('Error in controller: ' + e);
      response.status(500).json({
        messages: [
          {
            code: "1",
            message: '' + e,
            dateTime: GetCurrentDateSTR(),
          },
        ],
        response: {},
      });
    }
  }