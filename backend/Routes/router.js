
// libs
const express = require('express');
const router = express.Router();

// test
router.get('/', (req, res) =>{
    res.send('Api working...'); 
})

module.exports = router;