
// libs
const { body } = require('express-validator');

const userCreationValidation = () =>{
    return [
        // invalid name
        body('name')
            .isString().withMessage('O nome é obrigatório...')
            .isLength({ min: 3 }).withMessage('O nome precisa ter no minímo 3 caracteres...'),

        // invalid email 
        body('email')
            .isString().withMessage('O email é obrigatório...')
            .isEmail().withMessage('Insira um email válido...'),

        // invalid password
        body('password')
            .isString().withMessage('A senha é obrigatória...')
            .isLength({ min: 5 }).withMessage('A senha precisa ter no minímo 5 caracteres...'),

        // invalid confirm password
        body('confirmPassword')
            .isString().withMessage('A confirmação de senha é obrigatória...')
            .custom((value, {req}) =>{
                if(value != req.body.password){
                    throw new Error('As senhas não são iguais...')
                }
                return true; // obligatory, it's for indicate the validation pass
            })
    ];
};

module.exports = {
    userCreationValidation
}