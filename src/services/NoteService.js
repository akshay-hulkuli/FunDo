import AxiosService  from "./AxiosService";

const axiosService = new AxiosService();

const config = {
    headers:{
        "Authorization" : localStorage.getItem('uid'),
    }
}
class NoteService {
    
    addNotes(url, data){
        return axiosService.PostMeth(url, data, config);
    }
    getNotes(url){
        return axiosService.GetMeth(url,config);
    }
    updateNotes(url,data){
        return axiosService.PostMeth(url,data, config);
    }
    updateColor(url,data){
        return axiosService.PostMeth(url,data,config);
    }
    archive(url,data){
        return axiosService.PostMeth(url,data, config);
    }
    addCollaborators(url,data){
        return axiosService.PostMeth(url, data, config);
    }
}

export default NoteService;