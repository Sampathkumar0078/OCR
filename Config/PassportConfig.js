const JswStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserRepo = require('../Repository/UserRepository');
const config = require('../config/AppConfig');
const Constants = require('../config/Constants');
var BPAPortalUserRoles = require('../Models').BPAPortalUserRoles;


module.exports = function (passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.application.secret;
	passport.use(new JswStrategy(opts, (jwt_payload, done) => {
		// console.log(jwt_payload);
		var conditions = {
			where: {
				userId: jwt_payload.userId,
				isDeleted: false
			},
			include: [
				{
					model: BPAPortalUserRoles,
					attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
					required: true
				}
			]
		}
		UserRepo.getOneWithCredentials(conditions, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (!user || user.isDeleted || !user.isActive) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		})
	}))
}