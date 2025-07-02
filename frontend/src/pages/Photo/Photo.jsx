
// css
import './Photo.css';

// utils
import { upload } from '../../utils/config';

// components
import Message from '../../components/Messages/Message';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

// hooks
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { getPhoto } from '../../slices/photoSlice';


const Photo = () => {
    // consts
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);


    ///////// functions


    // load photo data
    useEffect(() =>{
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // loading check
    if(loading){
        return <p>Carregando...</p>;
    }



    ///////// jsx


    return (
        <div id='photo'>
            <PhotoItem photo={ photo } />            
        </div>
    );
};

export default Photo;
