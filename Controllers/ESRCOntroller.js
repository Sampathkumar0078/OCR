const express = require('express');
const router = express.Router();
const passport = require('passport');

var Constants = require('../config/Constants');
const ESRService = require('../service/ESRService');
const BOService = require('../Service/BOService');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const _ = require('lodash');

/* Executive summary reports for PRODUCT OPERATIONS  */

/* Executive summary reports for CONTACT CENTRE  */

/* Executive summary reports for BUSINESS OPERATIONS  */

/* Executive summary reports for TRADE OPERATIONS  */
router.get('/firco', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.firco(req, res);
});

router.get('/sama', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.sama(req, res);
});

router.get('/baialajeil', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.baiAlAjeil(req, res);
});

router.get('/po', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.po(req, res);
});

router.get('/ccmsd', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.ccMsd(req, res);
});

router.get('/ccnonmsd', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.ccNonMsd(req, res);
});

/* APIs below responses static data from service layer due to lack of data in DB */
router.get('/lgreleaser', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.lgReleaserEsr(req, res);
});

router.get('/lgclosure', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.lgClosureEsr(req, res);
});

router.get('/lgissuanceandammendment', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.importLcExportLcEsr(req, res);
});

/* Not implemented till in BOT Health report either */
router.get('/amlkyc', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.amlKycEsr(req, res);
});

router.get('/boothers', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return ESRService.boOthersEsr(req, res);
});


module.exports = router;

