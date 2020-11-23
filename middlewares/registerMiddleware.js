const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('email').isLength().isEmail().withMessage('El campo Correo electrónico debe ser un email'),
    check('password').isLength({ min: 3 }).withMessage('El campo Contraseña debe contener al menos 3 caracteres'),
    check('passwordrepeat').matches('password').withMessage('Las contraseñas deben coincidir'),
    check('fecnac').isLength()
]

module.exports = registerMiddleware;