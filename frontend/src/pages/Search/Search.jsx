// css
import './Search.css';

// hooks
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../components/useResetComponentMessage'; // custom hook
import { useQuery } from '../../Hooks/useQuery'; // custom hook

// components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

// redux
import { searchPhotos, like } from '../../slices/photoSlice';


const Search = () => {
    // consts
    const query = useQuery();
    const search = query.get('q'); // custom hook
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch); // custom hook
    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    // states


    ////////// functions


    // load photos
    useEffect(() =>{
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

    // like a photo
    const handleLike = (photo) =>{
        dispatch(like(photo._id));

        resetMessage();
    };

    // laoding check
    if(loading){
        return <p>Carregando...</p>
    }


    ////////// jsx


    return (
        <div id='search'>
            <h2>Você está buscando por: { search }</h2>
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
                    Não foram encontrados os resultados para sua busca... 
                </h2>
            ) }      
        </div>
    );
};

export default Search;