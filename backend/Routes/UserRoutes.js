// libs
const express = require('express');
const router = express.Router();
 
// controller 
const { register, login, getCurrentUser, update, getUserById } = require('../Controller/UserController');

// middlewares
const validate = require('../middlewares/HandleValidation'); 
const { userCreationValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidation');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');


// routes
router.post('/register', userCreationValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update);
router.get('/:id', getUserById);


module.exports = router;