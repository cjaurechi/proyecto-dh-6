// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path')

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
router.get('/registro', usersController.registro);
router.post('/registro', usersController.createRegistro);

/*** LOGIN ***/
router.get('/login', usersController.login);

module.exports = router;