// css
import './NavBar.css';

// hooks
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
    BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill 
} from 'react-icons/bs'; // "bs" = bootstrap lib
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

// custom hook
import { useAuth } from '../../Hooks/useAuth';

// redux
import { logout, reset } from '../../slices/authSlice';


const NavBar = () => {
    // states
    const [ query, setQuery ] = useState('');

    // consts
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    /////////// functions


    // logout
    const handleLogout = () =>{
        dispatch(logout());
        dispatch(reset());

        navigate('/login');
    }

    // search
    const handleSearch = (e) =>{
        e.preventDefault();

        if(query){
            return navigate(`/search/?q=${query}`);
        }
    };


    /////////// jsx


    return (
        <nav id="nav">
            <Link to='/'>InstaReact</Link>

            <form id='search-form' onSubmit={ handleSearch }>
                <BsSearch />
                <input type="text" placeholder='Pesquisar' onChange={ (e) => setQuery(e.target.value) }  />
            </form>

            <ul id="nav-links">
                {
                    auth ? (
                        <>
                            <li>
                                <NavLink to='/'>
                                    < BsHouseDoorFill />
                                </NavLink>
                            </li>
                            { user && (
                                <li>
                                    <NavLink to={`/users/${user._id}`}>
                                        <BsFillCameraFill />
                                    </NavLink>
                                </li>
                            ) }                        
                            <li>
                                <NavLink to='/profile'>
                                    <BsFillPersonFill />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={ handleLogout }>
                                    Sair
                                </span>
                            </li>
                        </>
                    ) : (
                        <>                        
                            <li>
                                <NavLink to='/register'>
                                    Cadastrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/login'>
                                    Entrar
                                </NavLink>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
};

export default NavBar;
