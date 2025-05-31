// css
import './NavBar.css';

// hooks
import { NavLink, Link } from 'react-router-dom';
import { 
    BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill 
} from 'react-icons/bs'; // "bs" = bootstrap lib


const NavBar = () => {
    return (
        <nav id="nav">
            <Link to='/'>InstaReact</Link>

            <form>
                <BsSearch />
                <input type="text" />
            </form>

            <ul id="nav-links">
                <NavLink to='/'>
                    < BsHouseDoorFill />
                </NavLink>
                <NavLink to='/register'>
                    Cadastrar
                </NavLink>
                <NavLink to='/login'>
                    Entrar
                </NavLink>
            </ul>
        </nav>
    );
};

export default NavBar;
