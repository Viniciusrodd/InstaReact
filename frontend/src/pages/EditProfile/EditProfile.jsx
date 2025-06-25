
// css
import './EditProfile.css';

// utils
import { upload  } from '../../utils/config';

// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

// components
import Message from '../../components/Messages/Message';



const EditProfile = () => {
    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");    

    // consts
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user);


    /////// functions    


    // load user data
    useEffect(() =>{
        dispatch(profile());
    }, [dispatch]);
    
    // fill form w/ user data
    useEffect(() =>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
            setPassword(user.password);
        }
    }, [user]);

    // form
    const handleSubmit = async (e) =>{
        e.preventDefault();

        // getting user data
        const userData = { name };

        // fields verification
        if(profileImage){
            userData.profileImage = profileImage;
        }
        if(bio){
            userData.bio = bio;
        }
        if(password){
            userData.password = password;
        }

        // build form data
        const formData = new FormData();
        const userFormData = Object.keys(userData).forEach((key) => 
            formData.append(key, userData[key])
        );
        formData.append('user', userFormData);

        // update profile
        await dispatch(updateProfile(formData));

        // reset messages
        setTimeout(() =>{
            dispatch(resetMessage());
        }, 2000);
    };

    // set image values
    const handleFile = (e) =>{
        // image preview
        const image = e.target.files[0];
        setPreviewImage(image);

        // update image state
        setProfileImage(image);
    };


    /////// jsx


    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">
                Adicione uma imagem de perfil, e conte mais sobre você...
            </p>
            { (user.profileImage || previewImage) && (
                <img 
                    className='profile-image'
                    src={ previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}` }
                    alt={ user.name }
                />
            ) }
        
            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder='Nome' value={ name || '' } onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Email' disabled value={ email || '' } />
                <label>
                    <span>Imagem do perfil: </span>
                    <input type="file" onChange={ handleFile } />
                </label>
                <label>
                    <span>Bio: </span>
                    <input type="text" placeholder='Descrição do perfil' value={ bio || '' } onChange={(e) => setBio(e.target.value)} />
                </label>
                <label>
                    <span>Quer alterar a senha ?</span>
                    <input type="password" placeholder='Digite sua nova senha' onChange={(e) => setPassword(e.target.value)} />
                </label>
                {!loading ? ( 
                    <input type="submit" value="Atualizar" /> 
                ) : (
                    <input type="submit" value="Aguarde..." disabled /> 
                )}
                { error && <Message msg={ error } type='error' /> }
                { message && <Message msg={ message } type='success' /> }
            </form>
        </div>
    );
};

export default EditProfile;
