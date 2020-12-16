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
router.get('/registro', authMiddleware, usersController.register);
router.post('/registro', upload.any(), registerMiddleware, usersController.createUser);

/*** LOGIN ***/
router.get('/login', authMiddleware, usersController.login);
router.post('/login', usersController.processLogin)

/*** LOGOUT ***/
router.get('/logout', authMiddleware,usersController.logout);

/*** PROFILE ***/
router.get('/perfil', authMiddleware, usersController.getProfile);
router.post('/perfil', usersController.updateProfile)

module.exports = router;