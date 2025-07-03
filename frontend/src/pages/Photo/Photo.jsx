
// css
import './Photo.css';

// utils
import { upload } from '../../utils/config';

// components
import Message from '../../components/Messages/Message';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

// hooks
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../components/useResetComponentMessage'; // custom hook

// redux
import { getPhoto, like } from '../../slices/photoSlice';


const Photo = () => {
    // consts
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);
    const resetMessage = useResetComponentMessage(dispatch); // custom hook


    ///////// functions


    // load photo data
    useEffect(() =>{
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // executing a like
    const handleLike = () =>{
        dispatch(like(photo._id));

        resetMessage();
    };

    // loading check
    if(loading){
        return <p>Carregando...</p>;
    }



    ///////// jsx


    return (
        <div id='photo'>
            <PhotoItem photo={ photo } />            
            <LikeContainer photo={ photo } user={ user } handleLike={ handleLike }/>
            <div className="message-container">
                { error && <Message msg={error} type='error' /> }
                { message && <Message msg={message} type='success' /> }
            </div>
        </div>
    );
};

export default Photo;
