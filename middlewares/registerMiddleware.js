const db = require('../database/models');
const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('name').isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    check('last_name').isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),
    check('email').isEmail().withMessage('El email ingresado no es válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres válidos'),
    body('passwordRepeat').custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Las contraseñas deben coincidir'),

    body('profile').custom((value, { req, loc, path }) => {
              
        if (req.files[0] == undefined) {
            throw new Error ('Debe seleccionar una foto de perfil');
        } else{
            if (!(/\.(jpg|jpeg|png|gif)$/i).test(uploadFile.originalname)) {
                throw new Error('El archivo a adjuntar no es una imagen')
            } else{
            return true;}
       
    }
})
]

module.exports = registerMiddleware;