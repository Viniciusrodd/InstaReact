
// hooks
import { useLocation } from "react-router-dom";
import { useMemo } from "react";


// hook that serves to read the URL parameters (the query string), in an optimized way with useMemo.
export const useQuery = () =>{
    const { search } = useLocation();

    // usememo ensures that URLSearchParams will only be recreated when the search value changes, 
    // avoiding unnecessarily recreating objects on each render
    return useMemo(() => new URLSearchParams(search), [search]);
};