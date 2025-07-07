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
    const resetMessage = useResetComponentMessage(); // custom hook
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
        <div>
            <h1>Homepage</h1>
        </div>
    );
};

export default Home;
