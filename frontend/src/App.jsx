// app style
import './App.css'

// hooks
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// custom hooks
import { useAuth } from './Hooks/useAuth';

// pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

// components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';


function App() {
    // custom hook returns
    const { auth, loading } = useAuth();

    if(loading){
        return <p>Carregando...</p>
    }

    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={ auth ? <Home /> : <Navigate to='/login' /> } />
                        <Route path='/register' element={ !auth ? <Register /> : <Navigate to='/' /> } />
                        <Route path='/login' element={ !auth ? <Login /> : <Navigate to='/' /> } />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>      
    );
};

export default App;
