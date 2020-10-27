var express = require('express');
var router = express.Router();
const productoController = require("../controllers/productsController")

/* producto page */
router.get('/', productoController.productDetail);

/* router.post('/', productoController.alta);

router.get('/:id', productoController.editar);

router.put('/:id', productoController.modificacion);

router.delete('/:id', productoController.baja);  */

module.exports = router;