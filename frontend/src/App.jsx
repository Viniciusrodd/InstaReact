// app style
import './App.css'

// router dependencies
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/login' element={ <Login /> } />
                </Routes>
            </BrowserRouter>
        </div>      
    );
};

export default App;
