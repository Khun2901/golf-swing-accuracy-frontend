const express = require('express')
const {getSensorsdatas,createSensorsdata} = require('../controllers/sensor')
const router = express.Router()

router.route('/').get(getSensorsdatas).post(createSensorsdata)

module.exports = router