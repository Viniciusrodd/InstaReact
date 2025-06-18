
// importing http config utils
import { api, requestConfig } from "../utils/config";


// register an user
const register = async (data) =>{
    const config = requestConfig('POST', data); //"config" from requestConfig
    try{
        const res = await fetch(api + '/users/register', config)
            .then((res) => res.json())
            .catch((error) => error);

        if(res){
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


const authService = {
    register, logout
};


export default authService;