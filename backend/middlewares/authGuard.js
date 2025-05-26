
// model
const UserModel = require('../Models/User');

// libs
const jwt = require('jsonwebtoken');
require('dotenv').config();

// env
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authGuard && authGuard.split(' ')[1]; // get only token
    
    // check if header has a token
    if(!token) return res.status(401).json({ errors: ['Acesso negado...'] });

    // check if token is valid
    try{
        const verified = jwt.verify(token, jwtSecret);
        req.user = await UserModel.findById(verified.id).select('-password'); // find without password
        
        next();
    }
    catch(error){
        res.status(401).json({ errors: ['Token inválido...'] });
    }
};


module.exports = authGuard;