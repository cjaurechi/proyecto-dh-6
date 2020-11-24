// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path')
const { check, validationResult, body } = require("express-validator");
let guestMiddleware = require('../middlewares/guestMiddleware');
let authMiddleware = require('../middlewares/authMiddleware');
let registerMiddleware = require('../middlewares/registerMiddleware');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.body.email.replace(/\s/g, "-").toLowerCase() + '.jpg')
    }
})

var upload = multer({ storage: storage })

// ********** Require de Controladores **********
const usersController = require('../controllers/usersController');

/*** REGISTRO ***/
router.get('/registro', authMiddleware, usersController.registro);
/* router.post('/registro', [check('email').isEmail().withMessage('Este campo debe ser un email'), check('password').isLength({ min: 3 }).withMessage('Este campo debe contener al menos 3 caracteres')], usersController.createRegistro); */

/* router.get('/registro', guestMiddleware, usersController.register); */
router.post('/registro', registerMiddleware, upload.any(), usersController.createUser); // Agregar registerMiddleware

/*** LOGIN ***/
router.get('/login', authMiddleware,usersController.login);
router.post('/login', usersController.processLogin)

module.exports = router;