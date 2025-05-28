
// libs
const express = require('express');
const router = express.Router();
 
// controller
const { insertPhoto } = require('../Controller/PhotoController');

// middleware
const { photoInsertValidation } = require('../middlewares/PhotoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/HandleValidation'); 
const { imageUpload } = require('../middlewares/imageUpload');

// routes
router.post('/', authGuard, imageUpload.single('image'), photoInsertValidation(), validate, insertPhoto);


module.exports = router;