
// css
import './Profile.css';

// utils
import { upload } from '../../utils/config';

// components
import Message from '../../components/Messages/Message';

// hooks
import { Link, useParams } from 'react-router-dom';
import { BsFillEyeFill, BsPencil, BsXLg } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../slices/userSlice';


const Profile = () => {
    // consts
    const { id } = useParams();
    
    // redux
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user); // user visited data
    const { user: userAuth } = useSelector((state) => state.auth); // user authenticated data

    // photo


    // load user data
    useEffect(() =>{
        dispatch(getUserDetails(id));
    }, [dispatch, id]);


    ///////// jsx


    return (
        <div id='profile'>
            <div className='profile-header'>
                { loading && <p>Carregando...</p> }

                { user.profileImage && (
                    <img src={ `${upload}/users/${user.profileImage}` } alt={ user.name } />
                ) }
                <div className="profile-description">
                    <h2>{ user.name }</h2>
                    <p>{ user.bio }</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
