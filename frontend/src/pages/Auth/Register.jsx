
// css
import './Auth.css'; 

// hooks
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Register = () => {

    // handle form
    const handleSubmit = (e) =>{
        e.preventDefault();
    };


    return (
        <div>
            <h2>InstaReact</h2>
            <p className="subtitle">Cadastre-se para ver as fotos de seus amigos.</p>

            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='Nome' />
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Senha' />
                <input type="password" placeholder='Confirme a senha' />
            
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
