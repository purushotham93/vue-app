import axios from "axios";
import { COVID_APIS, SERVER_STATUS } from "./constants";
import { CovidError } from "./covid-error";

export class CovidService {
    public async getHospitals() {
        try{
            const response = await axios.get(COVID_APIS.HOSPITALS);
            if(response.data) {
                return {
                    data: response?.data?.data,
                    status: SERVER_STATUS.OK
                }
            }
        } catch(e) {
            throw new CovidError().createCovidError();
        }
    }
    public async getLatestCovidStatistics() {
        try{
            const response = await axios.get(COVID_APIS.LATEST_STATS);
            console.log(response.data.data)
            if(response.data) {
                return {
                    data: response?.data?.data,
                    status: SERVER_STATUS.OK
                }
            }
        } catch(e) {
            throw new CovidError().createCovidError();
        }
    }
}
