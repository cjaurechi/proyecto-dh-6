// ********** Requires **********
const express = require('express');
const path = require('path')

const router = express.Router();

// ********** Require de Controladores **********
const cartController = require('../controllers/cartController');

/*** CARRITO DE COMPRA ***/
router.get('/', cartController.productCart);

module.exports = router;