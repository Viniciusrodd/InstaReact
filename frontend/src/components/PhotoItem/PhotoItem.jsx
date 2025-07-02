
// css
import './PhotoItem.css';

// utils
import { upload } from '../../utils/config';

// hooks
import { Link } from 'react-router-dom';

import { useEffect } from 'react';

const PhotoItem = ({ photo }) => {
    
    useEffect(() =>{
        if(photo){
            console.log(photo)
        }
    }, [photo])

    return (
        <div className='photo-item'>
            { photo.image && (
                <img src={ `${upload}/photos/${photo.image}` } alt={ photo.title } />
            ) }

            <h2>{ photo.title  }</h2>
            <p className='photo-author'>
                Publicada por: 
                <Link to={`/users/${photo.userId}`}> { photo.userName }</Link>
            </p>
        </div>
    );
};

export default PhotoItem;
