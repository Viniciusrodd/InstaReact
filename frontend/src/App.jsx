// app style
import './App.css'

// hooks
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

// components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';


function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/login' element={ <Login /> } />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>      
    );
};

export default App;
