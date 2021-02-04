const express = require('express');
const router = express.Router();

const usersApiController = require('../../controllers/api/usersController');


router.get('/', usersApiController.listado);
router.get('/:id?', usersApiController.detalle);



module.exports = router;