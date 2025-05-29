
// photo model
const PhotoModel = require('../Models/Photo');
const UserModel = require('../Models/User');


// libs
const mongoose = require('mongoose');


// photo insert with an user related to it
const insertPhoto = async (req, res) =>{
    const { title } = req.body;
    const image = req.file.filename;

    // get user data
    const reqUser = req.user;
    const user = await UserModel.findById(reqUser._id);

    // create photo
    const newPhoto = await PhotoModel.create({
        image, title, userId: user._id, username: user.name 
    });

    if(!newPhoto) return res.status(422).json({ errors:['Houve um problema na criação de foto...'] });

    return res.status(201).json(newPhoto);
};


// delete photo from db
const deletePhoto = async (req, res) =>{
    const { id } = req.params;
    const reqUser = req.user;
    
    // get photo
    let photo;
    try{
        photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));
        if(!photo) return res.status(404).json({ errors: ['Foto não encontrada...'] });
    }
    catch(error){
        return res.status(400).json({ errors:['Id de foto inválido...'] });
    }

    // photo not belongs to user?
    if(!photo.userId.equals(reqUser._id)){
        return res.status(422).json({ errors:['A foto não pertence ao usuário...'] });
    }

    // delete
    await PhotoModel.findByIdAndDelete(photo._id);

    return res.status(200).json({
        id: photo._id, message:'Foto excluída com sucesso!'
    });
};


// get all photos
const getAllPhotos = async (req, res) =>{
    // get
    const photos = await PhotoModel.find({}).sort([
        ['createdAt', -1] // more recents
    ]).exec(); // exec is a confirm order to execute a query
    if(!photos) return res.status(404).json({ errors:['Fotos não encontradas...'] });

    return res.status(200).json(photos);
};


// get user photos
const getUserPhotos = async (req, res) =>{
    const { id } = req.params;

    // find user photos
    let photos;
    try{
        photos = await PhotoModel.find({ userId: id }).sort([
            ['createdAt', -1]
        ]).exec();
        if(!photos) return res.status(404).json({ errors:['Fotos de usuário não encontradas...'] });
    }
    catch(error){
        return res.status(400).json({ errors:['Id de foto inválido...'] });
    }

    return res.status(200).json(photos);    
};


// get photo by id
const getPhotoById = async (req, res) =>{
    const { id } = req.params;

    // get photo
    let photo;
    try{
        photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));
        if(!photo) return res.status(404).json({ errors:['Foto não encontrada...'] });
    }
    catch(error){
        return res.status(400).json({ errors:['Id de foto inválido...'] });
    }

    return res.status(200).json(photo);    
};


// update a photo title
const updatePhotoTitle = async (req, res) =>{
    const { id } = req.params;
    const { title } = req.body;
    const reqUser = req.user;

    // photo exist?
    let photo;
    try{
        photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));
        if(!photo) return res.status(404).json({ errors:['Foto não encontrada...'] });        
    }
    catch(error){
        return res.status(400).json({ errors:['Id de foto inválido...'] });
    }

    // photo belongs to user?
    if(!photo.userId.equals(reqUser._id)){
        return res.status(422).json({ errors:['A foto não pertence ao usuário...'] });
    }

    // there is a title ?
    if(title) photo.title = title
    
    // update
    await photo.save();
    return res.status(200).json({ photo, message:'Foto atualizada com sucesso!' });        
};


// like in photo
const likePhoto = async (req, res) =>{
    const { id } = req.params;
    const reqUser = req.user;

    // photo exist?
    let photo;
    try{
        photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id));
        if(!photo) return res.status(404).json({ errors:['Foto não encontrada...'] });        
    }
    catch(error){
        return res.status(400).json({ errors:['Id de foto inválido...'] });
    }  

    // user already liked the photo?
    if(photo.likes.includes(reqUser._id)){ 
        return res.status(422).json({ errors:['Foto já curtida...'] })
    };

    // put userid in photo model > likes array
    photo.likes.push(reqUser._id);
    await photo.save();
    return res.status(200).json({ 
        photoId: id, userId: reqUser._id, message:'Foto curtida!'  
    });
};


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhotoTitle,
    likePhoto
};