// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path')
let {check,validationResult, body} = require("express-validator")
let guestMiddleware = require('../middlewares/guestMiddleware')
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

var storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'public/images/products')
    },
    filename : function(req,file,cb) {
        cb(null,file.fieldname+ '-' +Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage : storage})

// ********** Require de Controladores **********
const usersController = require('../controllers/usersController');

/*** REGISTRO ***/
router.get('/registro',guestMiddleware, usersController.registro);
router.post('/registro', 

//[ check("mail").isEmail().withMessage("Este campo debe ser mail"),
//    check("password").isLength({min:8}).withMessage("El campo debe contener mas de 8 caracteres"),
//  check("passwordrepeat").isLength({min:8}).withMessage("El campo debe contener mas de 8 caracteres"),
//],
usersController.createRegistro);

/*** LOGIN ***/
router.get('/login', usersController.login);
router.post('/login',usersController.processLogin)

module.exports = router;