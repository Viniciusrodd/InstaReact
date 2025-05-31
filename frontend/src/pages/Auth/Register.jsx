
// css
import './Auth.css'; 

// hooks
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Register = () => {
    // states
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');


    // handle form
    const handleSubmit = (e) =>{
        e.preventDefault();

        // user object
        const user = { name, email, password, confirmPassword };
        console.log(user);
    };


    return (
        <div id='register'>
            <h2>InstaReact</h2>
            <p className="subtitle">Cadastre-se para ver as fotos de seus amigos.</p>

            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='Nome' value={ name } onChange={ (e) => setName(e.target.value) } />
                <input type="email" placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) } />
                <input type="password" placeholder='Senha' value={ password } onChange={ (e) => setPassword(e.target.value) } />
                <input type="password" placeholder='Confirme a senha' value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) } />
            
                <input type="submit" value="Cadastrar" />
            </form>

            <p>
                Já tem conta ?
                <Link to='/login'>Clique aqui.</Link>
            </p>
        </div>
    );
};

export default Register;
