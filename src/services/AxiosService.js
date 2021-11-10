import axios from "axios";

class AxiosService {
    PostMeth(url, data){
        return axios.post(url, data);
    }
    PostMeth2 (url,data,config){
        return axios.post(url, data, config);
    }
    GetMeth(url,config){
        return axios.get(url,config);
    }
}

export default AxiosService;