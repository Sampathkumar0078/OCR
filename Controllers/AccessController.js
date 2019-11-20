const express = require('express');
const router = express.Router();
const passport = require('passport');
var Constants = require('../config/Constants');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const _ = require('lodash');
const AccessService = require('../Service/AccessService');

router.get('/getqueues/:dept?', (req, res, next) => {
	console.log(req.query.dept+' dept')
	
	if (_.isUndefined(req.query.dept)) {
		res.json({
			success: false,
			msg: 'Department name required.'
		});
	} else {
		return AccessService.getQueues(req, res);
	}
});

router.post('/resumeorpausequeue', (req, res, next) => {
	if (_.isUndefined(req.body.conditions.queueId) || _.isUndefined(req.body.conditions.department) || _.isUndefined(req.body.updateFields.running)) {
		res.json({
			success: false,
			msg: 'Restricted Condition.'
		});
	} else {
		return AccessService.resumeOrPauseQueue(req, res);
	}
})

router.get('/deletepending/:dept', (req, res, next) => {
	return AccessService.deletePendingSessions(req, res);
});

router.get('/getresources', (req, res, next) => {
	return AccessService.getResources(req, res);
});


router.get('/extract', (req, res, next) => {
	return AccessService.extract(req, res);
});

module.exports = router;