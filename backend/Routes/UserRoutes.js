// libs
const express = require('express');
const router = express.Router();
 
// controller 
const { register } = require('../Controller/UserController');

// routes
router.post('/register', register);

module.exports = router;