// ********** Requires **********
const express = require('express');
const path = require('path')
let authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

// ********** Require de Controladores **********
const cartController = require('../controllers/cartController');

/*** CARRITO DE COMPRA ***/
router.get('/', authMiddleware, cartController.productCart);

module.exports = router;