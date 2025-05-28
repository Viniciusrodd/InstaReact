
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


module.exports = {
    insertPhoto
};