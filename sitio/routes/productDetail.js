var express = require('express');
var router = express.Router();
const productoController = require("../controllers/productDetailController")

/* producto page */
router.get('/', productoController.producto);

module.exports = router;