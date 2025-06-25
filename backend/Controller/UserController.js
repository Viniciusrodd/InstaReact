
// user model
const UserModel = require('../Models/User');

// libs
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

// env
const jwtSecret = process.env.JWT_SECRET;


// generate user token
const tokenGenerate = (id) =>{
    return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};


// register
const register = async (req, res) =>{
    const {name, email, password} = req.body;

    // check user already exist
    const user = await UserModel.findOne({ email });
    if(user){
        res.status(422).json({ errors:['Por favor, utilize outro email...'] });
        return;
    }

    // generate password hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // create user
    const newUser = await UserModel.create({
        name, email, password: hash
    });

    // new user verify
    if(!newUser){
        res.status(422).json({ errors: ['Houve um erro na criação de usuário, por favor tente mais tarde...'] });
        return;
    }

    console.log('-----------------------------------');
    console.log(`User register with success: ${name}`);
    console.log('-----------------------------------');

    // return token
    return res.status(201).json({
        _id: newUser._id,
        token: tokenGenerate(newUser._id)
    });
};


// login
const login = async (req, res) =>{
    const { email, password } = req.body;

    // check user existence
    const user = await UserModel.findOne({ email })
    if(!user){
        res.status(404).json({ errors: ['O usuário não foi encontrado...'] });
        return;
    }

    // check password compares
    if( !(await bcrypt.compare(password, user.password)) ){
        res.status(422).json({ errors: ['Senha inválida...'] });
        return;        
    }

    // user + token
    return res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: tokenGenerate(user._id)
    });
};


// get current logged user
const getCurrentUser = async (req, res) =>{
    const user = req.user;
    return res.status(200).json(user);
};


// update user
const update = async (req, res) =>{
    const { name, password, bio } = req.body;
    let profileImage = null;

    if(req.file){
        profileImage = req.file.filename;
    }

    const reqUser = req.user;
    const user = await UserModel.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password');

    if(name){ user.name = name };
    if(password){
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
    }
    if(profileImage){ user.profileImage = profileImage };
    if(bio){ user.bio = bio };

    // save at bd
    await user.save();
    return res.status(200).json(user);
};


// get user by id
const getUserById = async (req, res) =>{
    const { id } = req.params;

    let user;
    try{
        user = await UserModel.findById(new mongoose.Types.ObjectId(id)).select('-password');
    }
    catch(error){
        return res.status(404).json({ errors:['usuário não encontrado'] });
    }

    return res.status(200).json(user);
};


// exporting endpoints
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
};