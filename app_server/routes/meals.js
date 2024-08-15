var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/meals');

/* GET meals page. */
router.get('/', ctrlMain.meals);

module.exports = router;