const db = require('../database/models');
const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('name').isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    check('last_name').isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),
    check('email').isEmail().withMessage('El email ingresado no es válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener mas de 8 caracteres'),
    body('passwordRepeat').custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Las contraseñas deben coincidir'),
    body('profile').custom((value, { req, loc, path }) => {
        
        if (req.files[0].originalname == undefined) {
            throw new Error ('Debe seleccionar una foto de perfil');
        } 
        return true;
    })
   
]

module.exports = registerMiddleware;