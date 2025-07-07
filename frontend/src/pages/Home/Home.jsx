// css
import './Home.css';

// components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

// hooks
import { Link } from 'react-router-dom';
import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useResetComponentMessage } from '../../components/useResetComponentMessage'; // custom hook

// redux
import { getPhotos, like } from '../../slices/photoSlice';


const Home = () => {
    // consts
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch); // custom hook
    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);


    /////////// functions


    // load all photos
    useEffect(() =>{
        dispatch(getPhotos());
    }, [dispatch]);

    // like a photo
    const handleLike = (photo) =>{
        dispatch(like(photo._id));

        resetMessage();
    };

    // laoding check
    if(loading){
        return <p>Carregando...</p>
    }


    /////////// jsx


    return (
        <div id='home'>
            { photos && photos.map((photo) => (
                <div key={ photo._id }>
                    <PhotoItem photo={ photo } />
                    <LikeContainer photo={ photo } user={ user } handleLike={ handleLike } />
                    <Link className='btn' to={`/photos/${photo._id}`}>
                        Ver mais
                    </Link>
                </div>
            )) }

            { photos && photos.length === 0 && (
                <h2 className='no-photos'>
                    Ainda não há fotos publicadas, 
                    <Link to={`/users/${user._id}`}>clique aqui</Link>
                </h2>
            ) }
        </div>
    );
};

export default Home;
