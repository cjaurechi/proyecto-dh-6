var express = require('express');
var router = express.Router();
const registerController = require("../controllers/registerController")


router.get('/',registerController.form);


module.exports = router;
  