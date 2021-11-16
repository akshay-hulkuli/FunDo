import AxiosService  from "./AxiosService";

const axiosService = new AxiosService();

const uconfig = {
    headers:{
        "Authorization" : localStorage.getItem('uid'),
    }
}

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
        return axiosService.PostMeth(url, data, config);
    }
    SearchUser(url,data){
        return axiosService.PostMeth(url,data,uconfig);
    }
}

export default UserService;