// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path')
let { check, validationResult, body } = require("express-validator")
let guestMiddleware = require('../middlewares/guestMiddleware')
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

// ********** Require de Controladores **********
const usersController = require('../controllers/usersController');

/*** REGISTRO ***/
router.get('/registro', guestMiddleware, usersController.registro);
router.post('/registro', [check('email').isEmail().withMessage('Este campo debe ser un email'), check('password').isLength({ min: 3 }).withMessage('Este campo debe contener al menos 3 caracteres')], usersController.createRegistro);

/*** LOGIN ***/
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin)

module.exports = router;