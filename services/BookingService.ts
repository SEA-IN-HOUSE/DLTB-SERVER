import axios from "axios"
class BookingService{

    async VerifyBooking(){

        try{

            const config = {
                headers :{
                    Authorization : `Bearer 20c51a91c753591c5ef5a7e944beda643dbc6e2e5436de8f562d`
                    
                }
            }
        
            const bodyParameters = {
                "query": [
                    {
                        "status": "BOOKED",
                        "remarks": "EB-QRUEI6FDC8",
                        "modificationLog_deviceID": "EASYBUS.PH"
                    }
                ]
            }
    
            const requestGetEmployeeFromOtherServer = await axios.post("https://s833502.fmphost.com/fmi/data/v1/databases/dltb%20booking/layouts/bookings/_find", JSON.stringify(bodyParameters), config)

            return requestGetEmployeeFromOtherServer;
        }catch(e){
            console.error(`Error in service: ${e}`)
            return null;
        }

    }

}

export default new BookingService();