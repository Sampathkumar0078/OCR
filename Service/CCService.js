var BPAWorkQueueRepo = require('../Repository/BPAWorkQueueRepo');
var BPAWorkQueueItemRepo = require('../Repository/BPAWorkQueueItemRepo');
var BPASessionLog_NonUnicodeRepo = require('../Repository/BPASessionLog_NonUnicodeRepo');
var BPACaseLockRepo = require('../Repository/BPACaseLockRepo');
var fs = require('fs-extra');
var xlsxj = require('xlsx-to-json-lc');
const Constants = require('../Config/Constants');
var _ = require('lodash');
var DateDiff = require('date-diff');
var async = require('async');
const ErrLogger = require('../util/error_handler/err_logger');
var util = require('util');
const addSubtractDate = require("add-subtract-date");
var CCServiceUtil = require('../Service/CCServiceUtil');

// module.exports.getNonMsdVolumeReport = function (req, res) {
//     BPAWorkQueueItemRepo.getAll(req, (err, wqData) => {
//         if (err) {
//             res.json(ErrLogger(err.toString()));
//         } else if (wqData) {
//             res.json({
//                 success: true,
//                 msg: 'Success',
//                 data: wqData
//             });
//         }
//     });
// }

module.exports.scheduler = function (req, res) {
    // var j = schedule.scheduleJob({ rule: '0-59/10 0-59/0 0-23/0 * * *' }, function () {
    //pathBuilder.getTodaysPaths('', (_watani2, _autoLeasing, _mrcc) => { // for production

    var _ammendInstallments = [];
    var _cashAcceptanceClaims = [];
    var _changeProduct = [];
    var _enableCc = [];
    var _linkContracts = [];
    var _merchantClaims = [];
    var _noc = [];
    var _partialPayment = [];
    var _reIssueCreditCard = [];

    var logFolders = Constants.CC.folders;

    var date = new Date();
    var currentFolderDate = (date.getDate() < Constants.number.TEN ? "0" + date.getDate() : date.getDate()) + Constants.MONTHS[date.getMonth()] + date.getFullYear();
    var currentFileDate = (date.getDate() < Constants.number.TEN ? "0" + date.getDate() : date.getDate()) + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getFullYear();

    _.forEach(logFolders, function (folder) {
        folder = folder + '\\' + currentFolderDate + '\\';
        fs.readdir(folder, (err, files) => {
            _.forEach(files, function (file) {
                switch (folder) {
                    case Constants.CC.ammendInstallments.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _ammendInstallments.push(Constants.CC.ammendInstallments.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.cashAcceptanceClaims.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _cashAcceptanceClaims.push(Constants.CC.cashAcceptanceClaims.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.changeProduct.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _changeProduct.push(Constants.CC.changeProduct.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.enableCc.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _enableCc.push(Constants.CC.enableCc.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.linkContracts.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _linkContracts.push(Constants.CC.linkContracts.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.merchantClaims.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _merchantClaims.push(Constants.CC.merchantClaims.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.noc.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _noc.push(Constants.CC.noc.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.partialPayment.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _partialPayment.push(Constants.CC.partialPayment.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.CC.reIssueCreditCard.staticFolderName + currentFolderDate + '\\':
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _reIssueCreditCard.push(Constants.CC.reIssueCreditCard.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                }
            });

        })
    });

    setTimeout(function () {
        var data = {
            ammendInstallments: _ammendInstallments,
            cashAcceptanceClaims: _cashAcceptanceClaims,
            changeProduct: _changeProduct,
            enableCc: _enableCc,
            linkContracts: _linkContracts,
            merchantClaims: _merchantClaims,
            noc: _noc,
            partialPayment: _partialPayment,
            reIssueCreditCard: _reIssueCreditCard,
        }
        fs.writeJSON(Constants.CC.pathsJSON, data, (err, out) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    sucess: true,
                    msg: "Wrote to CC.json"
                })
            }
        });
    }, 500)
}

module.exports.getNonMsdVolumeReport = function (req, res) {
    CCServiceUtil.nonMsdUtil(req, (err, _reports) => {
        if (err) {
            res.json({
                sucess: false,
                msg: 'Error: ' + err,
            });
        } else if (_reports)
            res.json({
                success: true,
                msg: 'Data found',
                data: _reports
            });
    });
}


module.exports.getMsdVolumeReport = function (req, res) {
    CCServiceUtil.msdUtil(req, (err, tableData) => {
        if (err) {
            res.json({
                sucess: false,
                msg: 'Error: ' + err,
            });
        } else if (tableData) {
            res.json({
                sucess: true,
                msg: 'Sucess',
                data: tableData
            });
        }
    });
}