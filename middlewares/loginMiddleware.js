const { check, validationResult, body } = require("express-validator");
const db = require('../database/models');

let loginMiddleware = [
    check('email').isEmail().withMessage('El email ingresado no es válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres válidos')
]

module.exports = loginMiddleware;