
// libs
const express = require('express');
const router = express.Router();
 
// controller
const { 
    insertPhoto, deletePhoto, getAllPhotos, 
    getUserPhotos, getPhotoById, updatePhotoTitle,
    likePhoto, commentPhoto
} = require('../Controller/PhotoController');

// middleware
const { photoInsertValidation, photoUpdateValidation } = require('../middlewares/PhotoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/HandleValidation'); 
const { imageUpload } = require('../middlewares/imageUpload');

// routes
router.post('/', authGuard, imageUpload.single('image'), photoInsertValidation(), validate, insertPhoto);
router.delete('/:id', authGuard, deletePhoto);
router.get('/', authGuard, getAllPhotos);
router.get('/user/:id', authGuard, getUserPhotos);
router.get('/:id', authGuard, getPhotoById);
router.put('/:id', authGuard, photoUpdateValidation(), validate, updatePhotoTitle);
router.put('/like/:id', authGuard, likePhoto);
router.put('/comment/:id', authGuard, commentPhoto);


module.exports = router;