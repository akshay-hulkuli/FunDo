import AxiosService  from "./AxiosService";

const axiosService = new AxiosService();

class UserService {
    Registration (url, data){
        return axiosService.PostMeth(url,data);
    }
    LogIn (url, data){
        return axiosService.PostMeth(url,data);
    }
    ForgotEmail (url, data){
        return axiosService.PostMeth(url,data);
    }
    Reset(url, data, config){
        return axiosService.PostMeth2(url, data, config);
    }
}

export default UserService;