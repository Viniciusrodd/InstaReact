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
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/photo';

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
                        <Route path='/profile' element={ auth ? <EditProfile /> : <Navigate to='/login' /> } />
                        <Route path='/users/:id' element={ auth ? <Profile /> : <Navigate to='/login' /> } />
                        <Route path='/register' element={ !auth ? <Register /> : <Navigate to='/' /> } />
                        <Route path='/login' element={ !auth ? <Login /> : <Navigate to='/' /> } />
                        <Route path='/photos/:id' element={ auth ? <Photo /> : <Navigate to='/login' /> } />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>      
    );
};

export default App;
