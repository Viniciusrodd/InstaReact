
// css
import './LikeContainer.css';

// icons
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useEffect } from 'react';

const LikeContainer = ({ photo, user, handleLike }) => {
    /*
    useEffect(() =>{
        if(photo){
            console.log(photo)
        }
    }, [photo])
    */

    return (
        <div className='like'>
            { photo.likes && user && (
                <>
                    { 
                        photo?.likes.includes(user._id) ? (
                            <BsHeartFill />
                        ) : (
                            <BsHeart onClick={ () => handleLike(photo) } />
                        )
                    }
                    <p>{ photo.likes.length } Likes(s)</p>
                </>
            ) }
        </div>
    );
};

export default LikeContainer;
