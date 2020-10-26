// ********** Requires **********
const express = require('express');
const router = express.Router();

// ********** Require de Controladores **********
const productsController = require('../controllers/productsController');


router.get('/carrito/', productsController.productCart);




module.exports = router;