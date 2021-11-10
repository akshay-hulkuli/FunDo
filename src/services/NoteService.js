import AxiosService  from "./AxiosService";

const axiosService = new AxiosService();

class NoteService {
    addNotes(url, data, config){
        return axiosService.PostMeth2(url, data, config);
    }
    getNotes(url,config){
        return axiosService.GetMeth(url,config);
    }
}

export default NoteService;