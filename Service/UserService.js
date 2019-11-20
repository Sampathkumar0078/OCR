// const config = require('../config/AppConfig');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// var randomstring = require("randomstring");
// var shortid = require('shortid');

// const MailSender = require('../util/email_util/MailSender');
const Constants = require("../config/Constants");
// const CommonUtil = require("../util/common/Common");
const ErrLogger = require('../util/error_handler/err_logger');
const jwt = require('jsonwebtoken');
const AppConfig = require('../Config/AppConfig');
const ApplicationConstants = require('../Config/ApplicationConstants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var BPAPortalUserRoles = require('../Models').BPAPortalUserRoles;
// const selectFields = '';
// const path = require('path');
// const fs = require('fs');
// var _ = require('lodash');
// const dateFormat = require('dateformat');
// const PermissionModel = require('../model/Permissions');
// const ApplicationModel = require('../model/ApplicationModel');
// const async = require('async');
// var AWS = require('aws-sdk');
// const ObjectID = mongoose.Types.ObjectId;

var UserRepo = require('../Repository/UserRepository');

module.exports.getUser = function (req, res) {
	UserRepo.getUser({}, (err, users) => {
		if (err) {
			res.json(ErrLogger(err.toString()));
		} else {
			res.json({
				success: true,
				msg: 'Success',
				data: users
			});
		}
	});
}

module.exports.getAllUsers = function (req, res) {
	var pagination = req.body.pagination;
	const offSet = pagination.page * pagination.pageSize;
	const limit = offSet + pagination.pageSize;
	var conditions = {
		where: {
			isDeleted: { [Op.eq]: Constants.BOOLEAN.DB_FALSE }
		}
	}
	var paginatedConditions = {
		offSet,
		limit,
		order: [['createdAt', 'ASC']], // Default ASC
		where: {
			isDeleted: { [Op.eq]: Constants.BOOLEAN.DB_FALSE }
		},
		include: [
			{
				model: BPAPortalUserRoles,
				attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
				required: true
			}
		]
	}
	UserRepo.getAllUsers(paginatedConditions, (err, users) => {
		if (err) {
			res.json(ErrLogger(err.toString()));
		} else {
			UserRepo.getUsersCount(conditions, (err, _count) => {
				if (err) {
					res.json(ErrLogger(err.toString()));
				} else {
					var _data = { count: _count, users };
					res.json({
						success: true,
						msg: 'Success',
						data: _data
					});
				}
			});
		}
	});
}

module.exports.getWatani2Report = function (req, res) {
	res.json({
		success: true,
		msg: 'Success',
		data: [
			{ value: 458, name: 'Approved' },
			{ value: 200, name: 'Rejected' },
			{ value: 544, name: 'Reassigned' },
			{ value: 60, name: 'Outofscope' }
		]
	});
}

module.exports.authenticate = function (req, res) {
	var conditions = {
		where: {
			userId: { [Op.eq]: req.body.userId }
		},
		include: [
			{
				model: BPAPortalUserRoles,
				attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
				required: true
			}
		]
	}
	UserRepo.getUser(conditions, (err, user) => {
		authenticateUser(req, res, err, user);
	});
}

var authenticateUser = function (req, res, err, user) {
	if (err) {
		res.json(ErrLogger('authenticateUser - authenticateUser()', 'User', err.toString(), null));
		//	throw err
	}
	if (!user) {
		return res.json({
			success: false,
			msg: 'User not found'
		});
	} else if (user.isDeleted) {
		return res.json({
			success: false,
			isdeleted: true,
			msg: 'User account is been blocked'
		});
	} else if (!user.isActive) {
		return res.json({
			success: false,
			inactive: true,
			msg: 'User account is not active',
			data: { "firstName": user.firstName, "lastName": user.lastName }
		});
	} else {
		UserRepo.comparePassword(req.body.password, user.password, (err, isMatch) => {
			if (err) {
				res.json(ErrLogger('authenticateUser - comparePassword()', 'User', err.toString(), null));
			}
			if (isMatch) {
				var _user = {
					userId: user.userId,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					isDeleted: user.isDeleted,
					isActive: user.isActive,
					role: user.BPAPortalUserRole.type
				}
				const token = jwt.sign(_user, AppConfig.application.secret, {
					expiresIn: 604800 //1 week
				});
				if (token) {
					res.json({
						success: true,
						token: 'JWT ' + token,
						user: _user
					});
				}
			} else {
				return res.json({
					success: false,
					msg: 'Invalid Password'
				});
			}
		});
	}
}

module.exports.getRolesExcldingAdmin = function (req, res) {
	var conditions = {
		where: {
			type: { [Op.ne]: Constants.user.ROLE.ADMIN }
		},
		attributes: Constants.DB_CONST.DEFAULT_EXCLUDE
	}
	UserRepo.rolesGetAll(conditions, (err, userRoles) => {
		if (err) {
			res.json(err.toString());
		} else if (userRoles) {
			res.json({
				success: true,
				msg: 'Sucess',
				data: userRoles
			});
		}
	});
}

module.exports.addUsers = function (req, res) {
	var conditions = {
		where: {
			[Op.or]: {
				userId: { [Op.eq]: req.body.userId },
				email: { [Op.eq]: req.body.email }
			}
		}
	}
	UserRepo.getUser(conditions, (err, exist) => {
		if (err) {
			res.json(err.toString());
		} else if (exist) {
			res.json({
				success: true,
				msg: 'User already registered with portal.'
			});
		} else {
			UserRepo.createUser(prepareUser(req), (err, _user) => {
				if (err) {
					console.log(err)
					res.json(err.toString());
				} else {
					res.json({
						success: true,
						msg: 'Success',
						data: _user
					});
				}
			});
		}
	});
}

module.exports.addAdmin = function (req, res) {
	UserRepo.getUsersCount(Constants.NULL, (err, count) => {
		if (err) {
			res.json(err.toString());
		} else if (count == Constants.number.ZERO) {
			var adminUser = {
				userId: ApplicationConstants.ADMIN_CONSTS.DEFAULT_USERID,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email.toLowerCase(),
				password: req.body.password,
				role: ApplicationConstants.ADMIN_CONSTS.ROLE_NO
			}
			UserRepo.createUser(adminUser, (err, _userDataValues) => {
				if (err) {
					res.json(err.toString());
				} else {
					delete _userDataValues.isActive;
					delete _userDataValues.isDeleted;
					delete _userDataValues.createdAt;
					delete _userDataValues.updatedAt;
					delete _userDataValues.password;
					delete _userDataValues.role;
					res.json({
						success: true,
						msg: 'Success',
						data: _userDataValues
					});
				}
			});
		} else {
			res.json({
				success: true,
				msg: 'Sorry, an ADMIN already exist for portal.'
			});
		}
	});
}

var prepareUser = function (req) {
	var newUser = {
		userId: req.body.userId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email.toLowerCase(),
		password: req.body.password,
		role: Constants.user.ROLE_NO[req.body.role.toUpperCase()]
	};
	return newUser;
}

module.exports.updateUser = function (req, res) {
	var conditions = {
		userId: req.body.conditions.userId
	}
	var updateFields = req.body.updateFields
	if (updateFields.password) {
		UserRepo.hashPassword(updateFields.password, (err, hashedPswd) => {
			if (err) {
				res.json(ErrLogger(err.toString()));
			} else if (hashedPswd) {
				updateFields.password = hashedPswd;
				/* Updatation with password encrypted */
				UserRepo.findOneAndUpdate(conditions, updateFields, (err, isUpdated) => {
					if (err) {
						res.json({
							success: false,
							msg: err.toString()
						});
					} else if (isUpdated) {
						res.json({
							success: true,
							msg: 'Updated Successfully',
							data: isUpdated
						});
					}
				});
			}
		});
	} else {
		/* Normal update when the abbsence of password in updateFields */
		UserRepo.findOneAndUpdate(conditions, updateFields, (err, isUpdated) => {
			if (err) {
				res.json({
					success: false,
					msg: err.toString()
				});
			} else if (isUpdated) {
				res.json({
					success: true,
					msg: 'Updated Successfully',
					data: isUpdated
				});
			}
		});
	}
}


/* module.exports.changePassword = function (req, res) {
	UserRepo.find(
		{ where: conditions }
	).then(_userExist => {
		UserRepo.comparePassword(req.body.currentPassword)
	})
}
 */
module.exports.gethash = function (req, res) {
	UserRepo.hashPassword(req.body.password, (err, _hash) => {
		if (err) {
			res.json(ErrLogger(err.toString()));
		} else {
			res.json({
				success: true,
				msg: 'Success',
				data: _hash
			});
		}
	});
}