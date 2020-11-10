// ********** Requires **********
const express = require('express');

const router = express.Router();

// ********** Require de Controladores **********
const indexController = require('../controllers/indexController')

/*** HOME PAGE ***/
router.get('/', indexController.home);

/*** NOSOTROS ***/
router.get('/nosotros', indexController.nosotros);

/*** CONTACTO ***/
router.get('/contacto', indexController.contacto);

/*** COMO REGALAR ***/
router.get('/comoregalar', indexController.comoregalar);

module.exports = router;
