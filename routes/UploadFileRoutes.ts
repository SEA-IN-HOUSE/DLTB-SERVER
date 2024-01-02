import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { GetCurrentDateSTR } from '../common/GetCurrentDate';

const storage = multer.diskStorage({
  destination: './public/data/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Saving the file with its original name
  }
});

const upload = multer({ storage: storage });
const UploadFileRouter = Router();

UploadFileRouter.post('/upload-file', upload.single('receipt'), function (req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Constructing the file URL
    const fileUrl = req.protocol + '://' + req.get('host') + '/data/uploads/' + req.file.filename;

    res.status(200).json({messages : [{
        code: "0",
        message: "OK",
        dateTime: GetCurrentDateSTR(),
        }],
        response : { fileUrl: fileUrl }
    })

  
  } catch (err) {
    console.error("Error in file upload: " + err);
    res.status(500).json({ error: 'File upload failed' });
  }
});

export default UploadFileRouter;
