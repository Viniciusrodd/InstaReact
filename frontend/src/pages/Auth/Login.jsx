
// css
import './Auth.css'; 

// hooks
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Message from '../../components/Messages/Message';

// redux
import { login, reset } from '../../slices/authSlice';


const Login = () => {
    // states
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // consts
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);


    ////// functions


    // form
    const handleSubmit = (e) =>{
        e.preventDefault();

        const user = { email, password };
    
        dispatch(login(user));
    };

    // clean all states
    useEffect(() =>{
        dispatch(reset());
    }, [dispatch]);


    ////// jsx


    return (
        <div id='login'>
            <h2>InstaReact</h2>
            <p className="subtitle">Faça login para ver oque há de novo.</p>

            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='E-mail' value={ email || '' } onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Senha' value={ password || '' } onChange={(e) => setPassword(e.target.value)}/>
                {!loading ? ( 
                    <input type="submit" value="Entrar" /> 
                ) : (
                    <input type="submit" value="Aguarde..." disabled /> 
                )}
                { error && <Message msg={ error } type='error' /> }
            </form>

            <p>
                Não tem conta ? <Link to='/register'>Clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;
