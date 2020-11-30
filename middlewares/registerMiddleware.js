const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('email').isEmail().withMessage('Por favor escribí una dirección de correo electrónico válida'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe contener al menos 6 caracteres'),
    body('passwordrepeat').custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Las contraseñas deben coincidir')
    // ¿Agregar validaciones para los campos de fecha y foto de perfil? (Validar mayoría de edad y que el campo foto de perfil no esté vacío)
]

module.exports = registerMiddleware;