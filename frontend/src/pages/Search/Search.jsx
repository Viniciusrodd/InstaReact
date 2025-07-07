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


const Search = () => {
    return (
        <div>
            <h1>search</h1>            
        </div>
    );
};

export default Search;