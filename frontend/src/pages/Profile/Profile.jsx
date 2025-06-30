
// css
import './Profile.css';

// utils
import { upload } from '../../utils/config';

// components
import Message from '../../components/Messages/Message';

// hooks
import { Link, useParams } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';



const Profile = () => {
    // states
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ editId, setEditId ] = useState('');
    const [ editImage, setEditImage ] = useState('');
    const [ editTitle, setEditTitle ] = useState('');

    // consts
    const { id } = useParams();
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();


    // redux
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user); // user visited data
    const { user: userAuth } = useSelector((state) => state.auth); // user authenticated data
    const { photos, loading: loadingPhoto, error: errorPhoto, message: messagePhoto } = useSelector((state) => state.photo);


    ////// functions


    // reset messages
    const resetComponentMessages = () =>{
        setTimeout(() =>{
            dispatch(resetMessage());
        }, 2000);
    };

    // load user data + user photos
    useEffect(() =>{
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    // handle image file
    const handleFile = (e) =>{
        //image preview
        const image = e.target.files[0];
        setImage(image);
    };

    // form
    const submitHandle = (e) =>{
        e.preventDefault();

        const photoData = { title, image };

        // build form data
        const formData = new FormData();
        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));
        formData.append('photo', photoFormData);

        dispatch(publishPhoto(formData));
        setTitle('');
    
        resetComponentMessages();
    };

    // delete photo
    const handleDelete = (id) =>{
        dispatch(deletePhoto(id));

        resetComponentMessages();
    };

    // show or hide forms
    const hideOrShowForms = () =>{
        newPhotoForm.current.classList.toggle('hide');
        editPhotoForm.current.classList.toggle('hide');
    };

    // open edit form
    const handleEdit = (photo) =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if(editPhotoForm.current.classList.contains('hide')){
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    };

    // cancel edit photo
    const handleCancelEdit = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });   
        hideOrShowForms();
    };

    // update a photo
    const handleUpdate = (e) =>{
        e.preventDefault();

        const photoData = { title: editTitle, id: editId };
        dispatch(updatePhoto(photoData));

        resetComponentMessages();
    };


    ///////// jsx


    return (
        <div id='profile'>
            <div className='profile-header'>
                { loading && <p>Carregando...</p> }

                { user.profileImage && (
                    <img src={ `${upload}/users/${user.profileImage}` } alt={ user.name } />
                ) }
                <div className="profile-description">
                    <h2>{ user.name }</h2>
                    <p>{ user.bio }</p>
                </div>
            </div>

            { id === userAuth._id && (
                <>
                    <div className="new-photo" ref={ newPhotoForm }>
                        <h3>Compartilhe algum momento seu: </h3>
                        
                        <form onSubmit={ submitHandle }>
                            <label>
                                <span>Título para foto: </span>
                                <input type="text" placeholder='Insira um título' value={ title || '' } onChange={ (e) => setTitle(e.target.value) } />    
                            </label>
                            <label>
                                <span>Imagem: </span>
                                <input type="file" onChange={ handleFile } />    
                            </label>
                            { !loadingPhoto && <input type="submit" value="Postar" /> }
                            { loadingPhoto && <input type="submit" value="Aguarde..." disabled /> }
                        </form>
                    </div>

                    <div className='edit-photo hide' ref={ editPhotoForm }>
                        <p>Editando: </p>
                        { editImage && (
                            <img src={ `${upload}/photos/${editImage}` } alt={ editTitle } />
                        ) }

                        <form onSubmit={ handleUpdate }>
                            <input type="text" value={ editTitle || 'Insira um novo título' } 
                            onChange={ (e) => setEditTitle(e.target.value) } />    
                            
                            <input type="submit" value="Atualizar" />
                            <button className='cancel-btn' onClick={ handleCancelEdit }>
                                Cancelar edição
                            </button>
                        </form>
                    </div>
                    { errorPhoto && <Message msg={ errorPhoto } type='error' /> }
                    { messagePhoto && <Message msg={ messagePhoto } type='success' /> }
                </>
            ) }

            <div className="user-photos">
                <h2>Fotos publicadas: </h2>
                
                <div className="photos-container">
                    { photos && photos.map((photo) => (
                        <div className="photo" key={ photo._id }>
                            { photo.image && ( <img src={ `${upload}/photos/${photo.image}` } alt={photo.title} /> ) }
                            { id === userAuth._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill /> {/* view photo */}
                                    </Link>
                                    <BsPencilFill onClick={ () => handleEdit(photo) } /> {/* edit photo */}
                                    <BsXLg onClick={ () => handleDelete(photo._id) } /> {/* delete photo */}
                                </div>
                            ) : (
                                <Link className='btn' to={`/photos/${photo._id}`}>Ver</Link>
                            ) }
                        </div> 
                    )) }

                    { photos.length === 0 && <p>Ainda não há fotos publicadas</p> }
                </div>
            </div>
        </div>
    );
};

export default Profile;
