
// importing http config utils
import { api, requestConfig } from "../utils/config";


// register an user
const register = async (data) =>{
    const config = requestConfig('POST', data); //"config" from requestConfig
    try{
        const res = await fetch(api + '/users/register', config)
            .then((res) => res.json())
            .catch((error) => error);

        if(res._id){
            localStorage.setItem('user', JSON.stringify(res));
        }

        return res;
    }
    catch(error){
        console.log(error);
    }
}


// logout function
const logout = () =>{
    localStorage.removeItem('user');
};


// login user
const login = async (data) =>{
    const config = requestConfig('POST', data);
    try{
        const res = await fetch(api + '/users/login', config)
            .then((res) => res.json())
            .catch((error) => error);

        if(res._id){
            localStorage.setItem('user', JSON.stringify(res));
        }

        return res;
    }
    catch(error){
        console.log(error);
    }
}


const authService = {
    register, logout, login
};


export default authService;