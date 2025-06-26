
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


const Profile = () => {
    return (
        <div>
            <h1>Profile page</h1>
        </div>
    );
};

export default Profile;
