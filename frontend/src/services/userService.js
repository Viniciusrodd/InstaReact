
// config utils
import { api, requestConfig } from "../utils/config";


// get user details
const profile = async (data, token) =>{
    const config = requestConfig('GET', data, token);

    try{
        const res = await fetch(api + '/users/profile', config)
            .then((res) => res.json())
            .catch((error) => error);

        return res;
    }
    catch(error){
        console.log(error);
    }
};


// update user details
const updateProfile = async (data, token) =>{
    const config = requestConfig('PUT', data, token, true);

    try{
        const res = await fetch(api + '/users/', config)
            .then((res) => res.json())
            .catch((error) => error)

        return res;
    }
    catch(error){
        console.log(error);
    }
};


// get users details by id
const getUserDetails = async (id) =>{
    const config = requestConfig('GET');

    try{
        const res = await fetch(api + '/users/' + id, config)
            .then((res) => res.json())
            .catch((error) => error)

        return res;
    }
    catch(error){
        console.log(error);
    }
};


// export service
const userService = {
    profile, updateProfile, getUserDetails
};
export default userService;