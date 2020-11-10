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

<<<<<<< HEAD
/*** COMO REGALAR ***/
router.get('/comoregalar', indexController.comoregalar);
=======
/*** TEST ***/
router.get('/test', indexController.getTest);
>>>>>>> 5b4db30beafeca5413b9d80b7a89d09987d4f1a8

module.exports = router;
