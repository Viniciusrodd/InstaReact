
// user model
const UserModel = require('../Models/User');

// libs
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

    // return token
    if(!newUser){
        res.status(422).json({ errors: ['Houve um erro na criação de usuário, por favor tente mais tarde...'] });
        return;
    }

    res.status(201).json({
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
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: tokenGenerate(user._id)
    });
};


// exporting endpoints
module.exports = {
    register,
    login
};