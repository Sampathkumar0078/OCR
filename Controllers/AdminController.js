const express = require('express');
const router = express.Router();
const passport = require('passport');
const AppConstants = require('../Config/ApplicationConstants');
const Constants = require('../config/Constants');
const UserService = require('../service/UserService');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const _ = require('lodash');

/* ONLY ADMIN CAN CALL THE APIs RESIDES IN THIS CONTROLLER */
/* ========================================================================================================================================================= */

/* ADMIN can add new user to portal
	* Required Fileds
		** role, userId, email, password **
	* Defaults
		** isActive, isDeleted, createdAt, updatedAt **
*/
router.post('/adduser', (req, res, next) => {
	if (req.body && req.body.role.toUpperCase() == Constants.user.ROLE.ADMIN) {
		res.json({
			success: false,
			msg: 'Invalid role'
		});
	}
	console.log(req.body.userId,req.body.email,req.body.password,req.body.role+' in block admin')
	if (req.body.userId && req.body.email && req.body.password && req.body.role) {
		console.log(req.body.userId,req.body.email,req.body.password,req.body.role+' in block admin')
		return UserService.addUsers(req, res);
	} else {
		res.json({
			success: false,
			msg: 'Restricted condition'
		});
	}
});

/* Portal's very first user creation
	* Required Fields
		** email, password **
	* Defaults
		** role, userId, isActive, isDeleted, createdAt, updatedAt **
*/
router.post('/addadmin', (req, res, next) => {
	if (req.body && req.body.email && req.body.password) {
		return UserService.addAdmin(req, res);
	} else {
		res.json({
			success: false,
			msg: 'Restricted condition'
		});
	}
});

/* ADMIN can update user details excluding 
	* email
	* role, from any to ADMIN
	* createdAt
*/
router.post('/update', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	if (req.user.BPAPortalUserRole.type != Constants.user.ROLE.ADMIN) {
		res.json({
			success: false,
			msg: 'Unauthorized'
		});
	} else if (req.body && req.body.updateFields && (req.body.updateFields.role && (req.body.updateFields.role.toUpperCase() == Constants.user.ROLE.ADMIN || Constants.user.ROLE.ARR.indexOf(req.body.updateFields.role.toUpperCase()) < Constants.number.ZERO))) {
		res.json({
			success: false,
			msg: 'Invalid role'
		});
	} else if (req.body && req.body.conditions && req.body.conditions.userId && req.body.updateFields) {
		delete req.body.updateFields.email;
		delete req.body.updateFields.createdAt
		return UserService.updateUser(req, res);
	} else {
		res.json({
			success: false,
			msg: 'Restricted condition'
		});
	}

});


module.exports = router;