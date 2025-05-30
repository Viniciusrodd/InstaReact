
// libs
const { body } = require('express-validator');

// photo creation validation
const photoInsertValidation = () =>{
    return [
        body('title')
            .not().equals('undefined').withMessage('O título é obrigatório...')
            .isString().withMessage('O título é obrigatório...')
            .isLength({ min: 3 }).withMessage('O título precisa ter no minímo 3 caracteres...'),
        body('image')
            .custom((value, {req}) =>{
                if(!req.file){
                    throw new Error('A imagem é obrigatória...')
                } 
                return true;
            })
    ];
};


// photo update validation
const photoUpdateValidation = () =>{
    return [
        body('title')
            .optional()
            .isString().withMessage('O título é obrigatório...')
            .isLength({ min: 3 }).withMessage('O título precisa ter no minímo 3 caracteres...')
    ];
};


// photo comments validation
const photoCommentValidation = () =>{
    return [
        body('comment')
            .isString().withMessage('O comentário é obrigatório...')
    ];
};


module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    photoCommentValidation
}