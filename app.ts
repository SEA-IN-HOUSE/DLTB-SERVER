////////////////////////////////
// INITIALIZE ENV AND METADATA
///////////////////////////////
const dotenv = require('dotenv').config();
import "reflect-metadata";

/////////////////////////////
// INITIALIZE Libraries
////////////////////////////
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';


import * as http from 'http';
import { Server } from 'socket.io';

//////////////////////////////
// ROUTES
/////////////////////////////
import EmployeeRouter from "./routes/EmployeeRoutes";
import AuthRouter from "./routes/AuthenticationRoutes";
import CardUserRouter from "./routes/CardUserRoutes";
import AuthTokenRouter from "./routes/AuthorizationTokenRoute";
import TORMainRouter from "./routes/TORMainRoutes";
import DirectionRouter from "./routes/DirectionRoutes";
import TORTicketRouter from "./routes/TORTicketRoutes";
import TORFuelRouter from "./routes/TORFuelRoutes";
import TORRemittanceRouter from "./routes/TORRemittanceRoutes";
import MasterCardRouter from "./routes/MasterCardRoutes";
import TORTripRouter from "./routes/TORTripRoutes";
import TORInspectionRouter from "./routes/TORInspectionRoutes";
import TORViolationRouter from "./routes/TORViolationRoutes";
import TORTroubleRouter from "./routes/TORTroubleRoutes";
import EmployeeCardRouter from "./routes/EmployeeCardRoutes";

////////////////////////////
// DATABASE
///////////////////////////
import {connectToMongoDB, connectToFilipayDB} from './databases/DbConnection';
import VehicleRouter from "./routes/VehicleRoutes";
import DispatchRouter from "./routes/DispatchRoutes";
import RiderWalletRouter from "./routes/RiderWalletRoutes";
import RiderRouter from "./routes/RiderRoutes";
import StationRouter from "./routes/StationRoutes";
import UserRouter from "./routes/UserRoutes";
// import CooperativeEmployeeRouter from "./routes/CooperativeEmployeeRoutes";
import EmailOTPRouter from "./routes/EmailOTPRoutes";
import DeviceRouter from "./routes/DeviceRoutes";
import CooperativeRouter from "./routes/CooperativeRoutes";
import FilipayCardRouter from "./routes/FilipayCardRoutes";
import BookRouter from "./routes/BookRoutes";
import BalanceTorTicketRouter from "./routes/BalanceTorTicket";
import ActivityLogRouter from "./routes/ActivityLogRoutes";
import TransactionReportRouter from "./routes/TransactionReportRoutes";
import SummaryTicketRouter from "./routes/SummaryTicketRoutes";
import UploadFileRouter from "./routes/UploadFileRoutes";


//////////////////////////////////////////////////
//            INITIALIZE THE APPLICATION
//////////////////////////////////////////////////
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

//////////////////////////
// MIDDLEWARES
/////////////////////////

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors({
    origin: '*', // Change this to specify your allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: true,
}));

//////////////////////
// USED ROUTES
/////////////////////

const urlBackend = '/api/v1/filipay'

app.use(urlBackend, EmployeeRouter);

app.use(urlBackend, AuthRouter);

app.use(urlBackend, CardUserRouter);

app.use(urlBackend, AuthTokenRouter);

app.use(urlBackend, DirectionRouter);

app.use(urlBackend, MasterCardRouter);

app.use(urlBackend, EmployeeCardRouter);

app.use(urlBackend, TORMainRouter);

app.use(urlBackend, TORTicketRouter);

app.use(urlBackend, TORTripRouter);

app.use(urlBackend , TORFuelRouter);

app.use(urlBackend, TORRemittanceRouter);

app.use(urlBackend, TORInspectionRouter);

app.use(urlBackend, TORViolationRouter);

app.use(urlBackend, TORTroubleRouter);

app.use(urlBackend, VehicleRouter);

app.use(urlBackend, DispatchRouter);

app.use(urlBackend, RiderWalletRouter);

app.use(urlBackend, RiderRouter);

app.use(urlBackend, StationRouter);

app.use(urlBackend, UserRouter);

// app.use(urlBackend, CooperativeEmployeeRouter);

app.use(urlBackend, EmailOTPRouter);

app.use(urlBackend, DeviceRouter);

app.use(urlBackend, CooperativeRouter);

app.use(urlBackend, FilipayCardRouter);

app.use(urlBackend, BookRouter);

app.use(urlBackend, BalanceTorTicketRouter)

app.use(urlBackend, ActivityLogRouter);

app.use(urlBackend, TransactionReportRouter)

app.use(urlBackend, SummaryTicketRouter)

app.use(urlBackend, UploadFileRouter);

/////////////////////////
// DATABASE CONNECTION
////////////////////////

const url : string  = process.env.DB_CONNECTION_STRING? process.env.DB_CONNECTION_STRING : '';
const filipayUrl : string = process.env.DB_FILIPAY_CONNECTION_STRING ? process.env.DB_FILIPAY_CONNECTION_STRING : '';


connectToMongoDB(url);
//connectToFilipayDB(filipayUrl);

console.log(url);
console.log(filipayUrl);
////////////////////
// ESTABLISH
///////////////////


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle socket events here
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
 

server.listen(port , ()=>{
    console.log(`APP IS RUNNING ON PORT ${port}/`)
})

export {
    io
}