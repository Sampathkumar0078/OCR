const express = require('express');
const router = express.Router();
const passport = require('passport');

var Constants = require('../Config/Constants');
const UserService = require('../Service/UserService');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const _ = require('lodash');

//Authenticate
router.post('/authenticate', (req, res, next) => {
	if (req.body && req.body.userId && req.body.password) {
		return UserService.authenticate(req, res);
	} else {
		res.json({	
			success: false,
			msg: 'Restricted condition'
		})
	}
});

router.get('/getroles', (req, res, next) => {
	return UserService.getRolesExcldingAdmin(req, res);
});

router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return UserService.getUser(req, res);
});

router.post('/getall', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	if (req.body.pagination && !_.isUndefined(req.body.pagination.page) && !_.isUndefined(req.body.pagination.pageSize)) {
		return UserService.getAllUsers(req, res);
	} else {
		res.json({
			sucess: false,
			msg: 'Restricted condition'
		})
	}
});

router.post('/hash', (req, res, next) => {
	return UserService.gethash(req, res);
});


// router.post('/changepassword', passport.authenticate('jwt', { session: false }), (req, res, next) => {
// 	UserService.changePassword(req, res);
// });

module.exports = router;