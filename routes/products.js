// ********** Requires **********
const express = require('express');
const multer = require('multer');
const path = require('path');
const validation = require('../middlewares/product_validator')
let authMiddleware = require('../middlewares/authMiddleware')

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
router.get('/', authMiddleware, productsController.productList);

router.get('/filtro', authMiddleware, productsController.productSearch);

/*** DETALLE DE PRODUCTO ***/
router.get('/:id/detalle',authMiddleware, productsController.productDetail);

/*** LISTA DE PRODUCTO ***/
router.get('/:id?/listar', authMiddleware,productsController.productList);

/*** CREAR UN PRODUCTO ***/ 
router.get('/crear', authMiddleware, productsController.create); 
router.post('/crear', authMiddleware, upload.any(), validation, productsController.store); 

/*** MODIFICAR UN PRODUCTO ***/ 
router.get('/listado', authMiddleware, productsController.productListForm); 
router.get('/listadofiltro', authMiddleware, productsController.productSearchForm); 
router.get('/:id/editar', authMiddleware, productsController.edit); 
router.put('/:id/editar',authMiddleware, upload.any(),validation,productsController.update); 
router.delete('/:id/borrar',authMiddleware, productsController.delete); 

module.exports = router;