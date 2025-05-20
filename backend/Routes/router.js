
// libs
const express = require('express');
const router = express.Router();

// using user routes...
router.use('/api/users', require('./UserRoutes'));

// test
router.get('/', (req, res) =>{
    res.send('Api working...'); 
});

module.exports = router;