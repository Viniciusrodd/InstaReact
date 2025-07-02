
// css
import './Photo.css';

// utils
import { upload } from '../../utils/config';

// components
import Message from '../../components/Messages/Message';

// hooks
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// redux


const Photo = () => {
    return (
        <div>
            <h1>photo</h1>            
        </div>
    );
};

export default Photo;
