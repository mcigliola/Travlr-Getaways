var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/rooms');

/* GET rooms page. */
router.get('/', ctrlMain.rooms);

module.exports = router;