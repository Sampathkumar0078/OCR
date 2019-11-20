const express = require('express');
const router = express.Router();
var Constants = require('../config/Constants');
const CCService = require('../Service/CCService');
var multipart = require('connect-multiparty');
const _ = require('lodash');

router.get('/getnonmsdvolumereport', (req, res, next) => {
	return CCService.getNonMsdVolumeReport(req, res);
});

router.get('/getmsdvolumereport', (req, res, next) => {
	return CCService.getMsdVolumeReport(req, res);
});

router.get('/scheduler', (req, res, next) => {
	return CCService.scheduler(req, res);
});

module.exports = router;