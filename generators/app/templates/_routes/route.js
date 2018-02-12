const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.route('/ping').get(controller.sayping);

module.exports = router;
