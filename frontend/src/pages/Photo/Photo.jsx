
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
import { getPhoto, like, comment } from '../../slices/photoSlice';


const Photo = () => {
    // states
    const [ commentText, setCommentText ] = useState('');

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

    // insert a like
    const handleLike = () =>{
        dispatch(like(photo._id));

        resetMessage();
    };

    // insert a comment
    const handleComment = (e) =>{
        e.preventDefault();
        
        const commentData = { comment: commentText, id: photo._id };
        dispatch(comment(commentData));

        setCommentText('');
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

                <div className="comments">
                    <h3>Comentários: ({ photo.comments?.length })</h3>
                    <form onSubmit={ handleComment }>
                        <input type="text" placeholder='Insira o seu comentário' 
                        value={ commentText || '' } onChange={(e) => setCommentText(e.target.value)} />
                        <input type="submit" value="Enviar" />
                    </form>

                    { photo.comments?.length === 0 && <p>Não há comentários...</p> }
                    { photo.comments?.map((comment) => (
                        <div className="comment" key={ comment.comment }> {/* there's no id for comments, so... */}
                            <div className="author">
                                { comment.userImage && (
                                    <img src={ `${upload}/users/${comment.userImage}` } alt={ comment.userName } />
                                ) }

                                <Link to={`/users/${comment.userId}`}>
                                    <p>{ comment.userName }</p>
                                </Link>
                            </div>

                            <p>{ comment.comment }</p>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Photo;
