
// config utils
import { api, requestConfig } from "../utils/config";


// publish an user photo
const publishPhoto = async (data, token) =>{
    const config = requestConfig('GET', data, token, true);

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


// export service
const photoService = {
    publishPhoto
};
export default photoService;