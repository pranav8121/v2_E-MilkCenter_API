const express = require('express');
var router = express.Router();
const truncateController = require('../Controller/truncateController');


router.get('/truncateDailyData', truncateController.truncateDailyData);


module.exports = router;