
// libs
const express = require('express');
const router = express.Router();
 
// controller

// middleware
const { photoInsertValidation } = require('../middlewares/PhotoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/HandleValidation'); 


// routes


module.exports = router;