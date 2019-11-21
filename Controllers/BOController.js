const express = require('express');
const router = express.Router();
var Constants = require('../config/Constants');
const BOService = require('../Service/BOService');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const _ = require('lodash');

// router.get('/getAll', (req, res, next) => {
// 	return BOService.getQueueDetails(req, res);
// });

router.get('/countofcontracts', (req, res, next) => {
	return BOService.getPrePostCount(req, res);
});

router.get('/getbajlexceptions', (req, res, next) => {
	return BOService.getQueuesException(req, res);
});

// router.get('/getqueuedetails/:queueName', (req, res, next) => {
// 	if (!_.isUndefined(req.params.queueName)) {
// 		return BOService.getQueuesException(req, res);
// 	} else {
// 		res.json({
// 			success: false,
// 			msg: 'Invalid queue name'
// 		});
// 	}
// });

router.get('/issamahealthy/:process', (req, res, next) => {
	if (!_.isUndefined(req.params.process) && Constants.SAMA.shortHand.indexOf(req.params.process) > Constants.number.ONE) {
		return BOService.getCurrentStatus(req, res);
	} else {
		res.json({
			success: false,
			msg: 'Invalid process name'
		});
	}
});

router.get('/samareports', (req, res, next) => {
	return BOService.getSamaReports(req, res);
});

module.exports = router;