import axios from "axios";

class AxiosService {
    PostMeth(url, data){
        return axios.post(url, data);
    }
    PostMeth2 (url,data,config){
        return axios.post(url, data, config);
    }
}

export default AxiosService;