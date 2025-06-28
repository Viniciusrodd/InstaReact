
// config utils
import { api, requestConfig } from "../utils/config";


// publish an user photo
const publishPhoto = async (data, token) =>{
    const config = requestConfig('POST', data, token, true);

    try{
        const res = await fetch(api + '/photos', config)
            .then((res) => res.json())
            .catch((error) => error)

        return res;
    }
    catch(error){
        console.log(error);
    }
};


// get user photos
const getUserPhotos = async (id) =>{
    const config = requestConfig('GET');

    try{
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((error) => error)

        return res;
    }
    catch(error){
        console.log(error);
    }
};


// export service
const photoService = {
    publishPhoto, getUserPhotos
};
export default photoService;