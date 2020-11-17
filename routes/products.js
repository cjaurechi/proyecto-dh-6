// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path');
const validation = require('../middlewares/product_validator')

const router = express.Router();

var storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'public/images/products')
    },
    filename : function(req,file,cb) {
        cb(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage : storage})

// ********** Require de Controladores **********
const productsController = require('../controllers/productsController');
const { ValidationHalt } = require('express-validator/src/base');

/*** LISTADO DE PRODUCTOS ***/
router.get('/', productsController.productList);

/*** DETALLE DE PRODUCTO ***/
router.get('/:id/detalle', productsController.productDetail);

/*** LISTA DE PRODUCTO ***/
router.get('/:id?/listar', productsController.productList);

/*** CREAR UN PRODUCTO ***/ 
router.get('/crear', productsController.create); 

router.post('/',upload.any(),validation,productsController.store); 

/*** MODIFICAR UN PRODUCTO ***/ 
router.get('/:id/editar', productsController.edit); 
router.put('/:id/editar',upload.any(),validation,productsController.update); 
router.delete('/:id/borrar', productsController.delete); 

module.exports = router;