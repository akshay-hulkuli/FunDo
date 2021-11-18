class Auth{
    login(cb){
        localStorage.setItem('isAuthecated', true);
        cb()
    }
    logout(cb){
        localStorage.setItem('isAuthecated', false);
        cb()
    }
}

export default new Auth()