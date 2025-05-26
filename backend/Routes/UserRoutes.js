// libs
const express = require('express');
const router = express.Router();
 
// controller 
const { register, login, getCurrentUser } = require('../Controller/UserController');

// middlewares
const validate = require('../middlewares/HandleValidation'); 
const { userCreationValidation, loginValidation } = require('../middlewares/userValidation');
const authGuard = require('../middlewares/authGuard');


// routes
router.post('/register', userCreationValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);


module.exports = router;