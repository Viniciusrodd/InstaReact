
// css
import './Auth.css'; 

// hooks
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Message from '../../components/Messages/Message';

// redux



const Login = () => {
    // states
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    ////// functions

    const handleSubmit = (e) =>{
        e.preventDefault();
    };


    ////// jsx


    return (
        <div id='login'>
            <h2>InstaReact</h2>
            <p className="subtitle">Faça login para ver oque há de novo.</p>

            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='E-mail' value={ email || '' } onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Senha' value={ password || '' } onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Entrar" />
            </form>

            <p>
                Não tem conta ? <Link to='/register'>Clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;
