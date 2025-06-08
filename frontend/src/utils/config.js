// backend links
export const api = 'http://localhost:5122/api';
export const upload = 'http://localhost:5122/uploads'


// config
export const requestConfig = (method, data, token = null, image = null) =>{
    let config;

    if(image){
        config = {
            method,
            body: data,
            Headers: {}
        };
    }else if(method === 'DELETE' || data === null){
        config = {
            method,
            Headers: {}
        };
    }else{ // for insertions:
        config = {
            method,
            body: JSON.stringify(data),
            Headers: {
                "Content-Type": "application/json"
            }
        };
    }

    // check token
    if(token){
        config.Headers.Authorization = `Bearer ${token}`;
    }

    return config;
};