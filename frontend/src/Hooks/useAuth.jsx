
// hooks
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


export const useAuth = () =>{    
    // state
    const [ auth, setAuth ] = useState(false);    
    const [ loading, setLoading ] = useState(true);    

    // useSelector(): read states of store
    const { user } = useSelector((state) => state.auth);

    // check user auth
    useEffect(() =>{
        if(user){
            setAuth(true);
        }else{
            setAuth(false);
        }
        setLoading(false);
    }, [user]);

    return { auth, loading };
};

