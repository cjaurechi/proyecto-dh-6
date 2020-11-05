// ********** Requires **********
const express = require('express');

const router = express.Router();

// ********** Require de Controladores **********
const indexController = require('../controllers/indexController')

/*** HOME PAGE ***/
router.get('/', indexController.home);


/*** NOSOTROS ***/
router.get('/nosotros', indexController.nosotros);

module.exports = router;
