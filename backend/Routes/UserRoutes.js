// libs
const express = require('express');
const router = express.Router();
 
// controller 
const { register } = require('../Controller/UserController');

// middlewares
const validate = require('../middlewares/handleValidation'); 
const { userCreationValidation } = require('../middlewares/userValidation');


// routes
router.post('/register', userCreationValidation(), validate, register);


module.exports = router;