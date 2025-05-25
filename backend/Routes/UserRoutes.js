// libs
const express = require('express');
const router = express.Router();
 
// controller 
const { register, login } = require('../Controller/UserController');

// middlewares
const validate = require('../middlewares/handleValidation'); 
const { userCreationValidation, loginValidation } = require('../middlewares/userValidation');


// routes
router.post('/register', userCreationValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);



module.exports = router;