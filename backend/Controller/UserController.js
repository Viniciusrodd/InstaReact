
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
    const {name} = req.body;
    res.send('register route, seu nome: ' + name);
};


// exporting endpoints
module.exports = {
    register
};