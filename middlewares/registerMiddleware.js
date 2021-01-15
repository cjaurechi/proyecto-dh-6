const { check, validationResult, body } = require("express-validator");

let registerMiddleware = [
    check('name').isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    check('last_name').isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),
    check('email').isEmail().withMessage('Por favor escribí una dirección de correo electrónico válida'),
    check('fecnac').custom((value, { req }) => {
        if(new Date(value) <= new Date(req.body.fecnac)) {
            return false;
        } else {
            return true;
        }
    }).withMessage('La fecha es incorrecta'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
    body('passwordrepeat').custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Las contraseñas deben coincidir'),
    body('profile').custom((value, { req, loc, path }) => {
        if (req.files == undefined) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Por favor, seleccioná una foto de perfil')
    // ¿Agregar validacion para los campos de fecha? (Validar mayoría de edad)
]

module.exports = registerMiddleware;