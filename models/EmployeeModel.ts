import mongoose, { StringExpressionOperatorReturningObject, Document } from "mongoose";

export interface IEmployeeData  {

        coopId: string,

        lastName: string,

        firstName: string,

        middleName: string,

        nameSuffix: string,

        empNo: number,

        empStatus: string,

        empType: string,

        idName: string,

        designation: string,

        idPicture: string,

        idSignature: string,

        JTI_RFID: string,

        accessPrivileges: string,

        JTI_RFID_RequestDate: string

}


const employeeSchema = new mongoose.Schema({
  
    coopId:{
        type: String,
        index: true,
        default: "655321a339c1307c069616e9"
    },
    lastName: {
        type: String,
        default: '',
        index: true,
        required: true,
    },

    firstName: {
        type: String,
        default: '',
        index: true,
        required: true,
    },

    middleName:{
        type: String,
        default: '',
        index: true,
        required: false,
    },

    nameSuffix:{
        type: String,
        default: '',
        index: true,
        required: false,
    },

    empNo:{
        type: Number,
        default: '',
        index: true,
        required: true,
    },

    empStatus:{
        type: String,
        default: '',
        index: true,
        required: true,
    },

    empType:{
        type: String,
        default: '',
        index: true,
        required: true,
    },

    idName:{
        type: String,
        default:'',
        index: true,
        required: true,
    },

    designation:{
        type: String,
        default: '',
        index: true,
        required: true,
    },

    idPicture:{
        type: String,
        default:'',
        index: true,
        required: false,
    },

    idSignature:{
        type: String,
        default: '',
        index: true,
        required: false,
    },

    JTI_RFID:{
        type: String,
        default: '',
        index: true,
        required: true
    },

    accessPrivileges:{
        type: String,
        default: '',
        index: true,
        required: true,
    },

    JTI_RFID_RequestDate:{
        type: String,
        default: '',
        index: true,

    },
});

const EmployeeModel = mongoose.model('EmployeeRecordsv2', employeeSchema);
export default EmployeeModel;