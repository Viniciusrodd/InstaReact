
// libs
const { validationResult } = require('express-validator');


// middleware
const validate = (req, res, next) =>{
    const errors = validationResult(req);

    // without erros ?, just pass...
    if(errors.isEmpty()){
        return next();
    }

    // with errors ? separet them...
    const extractedErros = []; // there will be error messages
    errors.array().map((err) => extractedErros.push(err.msg));
    return res.status(422).json({
        errors: extractedErros // we will access this at frontend
    });
};


module.exports = validate;