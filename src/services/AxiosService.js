import axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"
class AxiosService {
    PostMeth(url, data, config=false){
        return axios.post(baseUrl+url, data, config);
    }
    GetMeth(url,config=false){
        return axios.get(baseUrl+url,config);
    }
}

export default AxiosService;