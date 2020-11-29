const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('email').isEmail().withMessage('Por favor escribí una dirección de correo electrónico válida'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener al menos 6 caracteres'),
    check('passwordrepeat').custom((value, {req, loc, path}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir');
        } else {
            return true;
        }
    }),
    check('fecnac').isLength()
]

module.exports = registerMiddleware;