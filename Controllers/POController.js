const express = require('express');
const router = express.Router();
var Constants = require('../config/Constants');
const POService = require('../Service/POService');
var multipart = require('connect-multiparty');
const _ = require('lodash');

router.get('/getvolumereport', (req, res, next) => {
	return POService.getVolumeReport(req, res);
});

router.get('/isLogsUpdated', (req, res, next) => {
	return POService.isLogsUpdated(req, res);
});

router.get('/gethangedvms', (req, res, next) => {
	return POService.gethangedvms(req, res);
});


module.exports = router;