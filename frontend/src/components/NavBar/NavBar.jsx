// css
import './NavBar.css';

// hooks
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
    BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill 
} from 'react-icons/bs'; // "bs" = bootstrap lib
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

// custom hook
import { useAuth } from '../../Hooks/useAuth';


const NavBar = () => {
    // user authentication
    const auth = useAuth();
    const user = useSelector((state) => state.auth);


    return (
        <nav id="nav">
            <Link to='/'>InstaReact</Link>

            <form id='search-form'>
                <BsSearch />
                <input type="text" placeholder='Pesquisar' />
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
                                    <NavLink to={`/user/${user._id}`}>
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
                                <span>Sair</span>
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
