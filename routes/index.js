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


/*** PREGUNTAS FRECUENTES ***/
router.get('/preguntasFrecuentes', indexController.preguntasFrecuentes);

/*** TEST ***/
router.get('/test', indexController.getTest);

module.exports = router;
