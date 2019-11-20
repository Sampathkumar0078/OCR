const _ = require('lodash');
const Constants = require('../Config/Constants');
const BPAWorkQueueItemRepo = require('../Repository/BPAWorkQueueItemRepo');
const BPAWorkQueueRepo = require('../Repository/BPAWorkQueueRepo');
var BPAWorkQueue = require('../Models').BPAWorkQueue;
const BPASessionLog_NonUnicodeRepo = require('../Repository/BPASessionLog_NonUnicodeRepo');
const BPACaseLockRepo = require('../Repository/BPACaseLockRepo');
var fs = require('fs');
var xlsxj = require('xlsx-to-json-lc');
var async = require('async');
const addSubtractDate = require("add-subtract-date");
const ErrLogger = require('../util/error_handler/err_logger');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
var POServiceUtil = require('../Service/POServiceUtil');
var CCServiceUtil = require('../Service/CCServiceUtil');

/* SAMA Executive Summary Report
    * Total cases count read from process,
    * BOT Scope cases from maker queues of SAMA,
    * Completed by BOT cases from check queues of SAMA
*/
module.exports.sama = function (req, res) {
    var samaLegal = {
        left_heading: 'Sama'
    };
    BPASessionLog_NonUnicodeRepo.getTotalVolumeSama((err, _data) => {
        if (err)
            res.json(ErrLogger(err.toString()));
        else if (_data) {
            var s1 = _.split(_data.attributexml, 'step3');
            var numberPattern = Constants.REGEX.ONLY_NUMS;
            var volumeArr = s1[Constants.number.ONE].match(numberPattern)
            samaLegal.totalCases = parseInt(volumeArr[Constants.number.ZERO]);

            var date = new Date();
            var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            var addOneDay = addSubtractDate.add(date, 1, Constants.DAYS_STR);
            var nextDate = addOneDay.getFullYear() + '-' + ((addOneDay.getMonth() + 1) < Constants.number.TEN ? '0' + (addOneDay.getMonth() + 1) : (addOneDay.getMonth() + 1)) + '-' + (addOneDay.getDate() < 10 ? '0' + addOneDay.getDate() : addOneDay.getDate());

            var makerQueueConditions = {
                where: {
                    loaded: {
                        [Op.between]: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                },
                attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
                include: [
                    {
                        model: BPAWorkQueue,
                        where: { name: { [Op.in]: Constants.SAMA.MAKERS } },
                        // attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
                        required: true
                    }
                ]
            }
            BPAWorkQueueItemRepo.getSamaEsr(makerQueueConditions, (err, rawData) => {
                if (err) {
                    console.log("Error : " + err);
                }
                else if (rawData) {
                    var checkerQueuesConditions = {
                        where: {
                            loaded: {
                                [Op.between]: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                            }
                        },
                        attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
                        include: [
                            {
                                model: BPAWorkQueue,
                                where: { name: { [Op.in]: Constants.SAMA.CHECKERS } },
                                // attributes: Constants.DB_CONST.DEFAULT_EXCLUDE,
                                required: true
                            }
                        ]
                    }
                    BPAWorkQueueItemRepo.getSamaEsr(checkerQueuesConditions, (err, _rawData) => {
                        var inScopeData = _.uniqBy(rawData, 'keyvalue');
                        var completedFromChecker = _.reject(_.uniqBy(_rawData, 'keyvalue'), { exception: null });
                        var botScope = rawData.length;
                        // var _completed = _.filter(inScopeData, { status: Constants.STATUS_NAMES.COMPLETED }); // replace this in production
                        var completedByBot = completedFromChecker//_.reject(inScopeData, { exception: null }); // this works in test env
                        var reassignedByBot = botScope - completedByBot.length;
                        var totalWithHumans = samaLegal.totalCases - completedByBot.length;
                        var botRecievedPercentage = _.round((botScope / samaLegal.totalCases) * Constants.NUMBER_HUNDRED);
                        var sucessPerOnBotScopeVolume = _.round((completedByBot.length / botScope) * Constants.NUMBER_HUNDRED) == 'NaN' ? 0 : _.round((completedByBot.length / botScope) * Constants.NUMBER_HUNDRED);
                        var sucessPerOnTotalVolume = _.round((completedByBot.length / samaLegal.totalCases) * Constants.NUMBER_HUNDRED);
                        if (completedByBot == Constants.number.ZERO) {
                            samaLegal.botScope = Constants.number.ZERO;
                            samaLegal.botRecievedPercentage = Constants.number.ZERO;
                            samaLegal.completedByBot = Constants.number.ZERO;
                            samaLegal.sucessPerOnBotScopeVolume = Constants.number.ZERO;
                            samaLegal.sucessPerOnTotalVolume = Constants.number.ZERO;
                            samaLegal.reassignedByBot = Constants.number.ZERO;
                        } else {
                            samaLegal.botScope = botScope;
                            samaLegal.botRecievedPercentage = botRecievedPercentage;
                            samaLegal.completedByBot = completedByBot.length;
                            samaLegal.sucessPerOnBotScopeVolume = sucessPerOnBotScopeVolume;
                            samaLegal.sucessPerOnTotalVolume = sucessPerOnTotalVolume;
                            samaLegal.reassignedByBot = reassignedByBot;
                        }
                        samaLegal.totalWithHumans = totalWithHumans;
                        res.json({
                            success: true,
                            msg: 'Data found',
                            data: samaLegal
                        });
                    });
                }
            });
        }
    });
}

/* Firco Executive Summary Report 
    * Total cases retireved from input file (i.e., downloaded from SAMANET Application, and saved in share folder),
    * BOT Scope, Completed by BOT, Reassigned by BOT, Total Cases with Humans, retrieved from hourly report of FIRCO from share folder
*/
module.exports.firco = function (req, res) {
    var date = new Date();
    var currentFolderDate = (date.getDate() < Constants.number.TEN ? '0' + date.getDate() : date.getDate()) + Constants.MONTHS[date.getMonth()] + date.getFullYear();
    var folderPath = Constants.BO.FIRCO.ROOT_FOLDER + currentFolderDate + Constants.BO.FIRCO.SUB_FOLDER;
    var _times = [];
    var _fileNamesArray = [];
    var fircoReport = {
        left_heading: 'Firco',
        totalCases: 0,
        botScope: 0,
        botRecievedPercentage: 0,
        completedByBot: 0,
        sucessPerOnBotScopeVolume: 0,
        sucessPerOnTotalVolume: 0,
        reassignedByBot: 0,
        totalWithHumans: 0
    }
    try {
        fs.readdir(folderPath, (err, files) => {
            if (files) {
                _.forEach(files, function (file) {
                    completeFilePath = folderPath + file;
                    if (fs.existsSync(completeFilePath)) {
                        const dirTime = fs.statSync(completeFilePath).mtime.getTime();
                        _times.push(dirTime);
                        _fileNamesArray.push({ fileName: completeFilePath, modifiedTime: dirTime })
                    }
                });
                var latestFileArray = _.filter(_fileNamesArray, { modifiedTime: _.max(_times) });
                var lastModifiedFileName = latestFileArray[Constants.number.ZERO].fileName;
                xlsxj({
                    input: lastModifiedFileName,
                    output: Constants.BO.FIRCO.OUTPUT_JSON,
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err)
                        console.log("Error : " + err);
                    else if (result) {
                        fs.readFile(Constants.BO.FIRCO.OUTPUT_JSON, (err, data) => {
                            if (err) throw err;
                            let report = JSON.parse(data);
                            var humanL1Array = _.filter(report, { 'row labels': 'Human-L1' });
                            l1 = _.filter(report, { 'row labels': 'L1' });
                            var l2 = _.filter(report, { 'row labels': 'L2' });
                            pass = _.filter(report, { 'row labels': 'Pass' });
                            grandToatal = _.filter(report, { 'row labels': 'Grand Total' });
                            reassignedByBot = parseInt(humanL1Array[Constants.number.ZERO]['count of transaction number']) + parseInt(l1[Constants.number.ZERO]['count of transaction number']);
                            reassignedPercentage = _.round(parseFloat(humanL1Array[Constants.number.ZERO]['count of transaction number2']) + parseFloat(l1[Constants.number.ZERO]['count of transaction number2']));
                            completedByBot = parseInt(l2[Constants.number.ZERO]['count of transaction number']) + parseInt(pass[Constants.number.ZERO]['count of transaction number']);
                            sucessPerOnBotScopeVolume = _.round(parseFloat(l2[Constants.number.ZERO]['count of transaction number2']) + parseFloat(pass[Constants.number.ZERO]['count of transaction number2']));
                            botScope = parseInt(grandToatal[Constants.number.ZERO]['count of transaction number']);

                            fs.readdir(Constants.BO.FIRCO.INPUT_FOLDER, (err, inputFiles) => {
                                _.forEach(inputFiles, function (inputFile) {
                                    xlsxj({
                                        input: Constants.BO.FIRCO.INPUT_FOLDER + inputFile,
                                        output: Constants.BO.FIRCO.OUTPUT_JSON,
                                        lowerCaseHeaders: true
                                    }, function (err, result) {
                                        if (err) {
                                            console.log("Error : " + err);
                                        }
                                        else if (result) {
                                            totalCases = result.length;
                                            sucessPerOnTotalVolume = _.round((completedByBot / totalCases) * Constants.NUMBER_HUNDRED);
                                            botRecievedPercentage = _.round((botScope / totalCases) * Constants.NUMBER_HUNDRED);
                                            totalWithHumans = totalCases - completedByBot;
                                            fircoReport.totalCases = totalCases,
                                                fircoReport.botScope = botScope,
                                                fircoReport.botRecievedPercentage = botRecievedPercentage,
                                                fircoReport.completedByBot = completedByBot,
                                                fircoReport.sucessPerOnBotScopeVolume = sucessPerOnBotScopeVolume,
                                                fircoReport.sucessPerOnTotalVolume = sucessPerOnTotalVolume,
                                                fircoReport.reassignedByBot = reassignedByBot,
                                                fircoReport.totalWithHumans = totalWithHumans
                                            res.json({
                                                sucess: true,
                                                msg: 'Sucess',
                                                data: fircoReport
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            } else {
                res.json({
                    sucess: true,
                    msg: 'Sucess',
                    data: fircoReport
                });
            }
        });
    }
    catch (error) {
        res.json({
            sucess: false,
            msg: error.toString(),
        });
    }
}

/* Product Operations Summary Report (Watani2, Car Leasing Unified, Revolving Credit Card)
    * Total Cases read from process,
    * BOT Scope, Completed by BOT, Reassigned by BOT retieved from logs which resides in share folder
*/
module.exports.po = function (req, res) {
    POServiceUtil.reportsoFPo(req, (err, _report) => {
        if (err) {
            res.json({
                sucess: false,
                msg: 'Error: ' + err
            });
        } else if (_report) {
            _data = _report.grandTotal;
            totalCases = 2145 // for test
            poEsr = {
                left_heading: 'Product Ops',
                totalCases: totalCases,
                botScope: _data.totalVolume,
                botRecievedPercentage: _.round(_data.totalVolume / totalCases * Constants.NUMBER_HUNDRED),
                completedByBot: _data.totalApproved + _data.totalRejected,
                sucessPerOnBotScopeVolume: _.round((_data.totalApproved + _data.totalRejected) / _data.totalVolume * Constants.NUMBER_HUNDRED),
                sucessPerOnTotalVolume: _.round((_data.totalApproved + _data.totalRejected) / totalCases * Constants.NUMBER_HUNDRED),
                reassignedByBot: _data.totalReassigned,
                totalWithHumans: totalCases + (_data.totalApproved + _data.totalRejected)
            }
            res.json({
                success: true,
                msg: 'Sucess',
                data: poEsr
            });
        }
    });
}

module.exports.baiAlAjeil = function (req, res) {
    var queue = {};
    var rawArr = [];
    var globalCount = Constants.BO.QUEUES_ARR.length;
    var iteratorFcn = function (queueName, done) {
        /* Create current date mssql format */
        var date = new Date();
        var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var addOneDay = addSubtractDate.add(date, 1, Constants.DAYS_STR);
        var nextDate = addOneDay.getFullYear() + '-' + ((addOneDay.getMonth() + 1) < Constants.number.TEN ? '0' + (addOneDay.getMonth() + 1) : (addOneDay.getMonth() + 1)) + '-' + (addOneDay.getDate() < 10 ? '0' + addOneDay.getDate() : addOneDay.getDate());
        var conditions = {
            name: queueName
        };
        var attributes = ['id'];
        BPAWorkQueueRepo.get(conditions, attributes, (err, _queue) => {
            if (err) {
                res.json(err.toString());
            } else if (!_.isUndefined(_queue) && !_.isUndefined(_queue.id)) {
                var iConditions = {
                    queueid: _queue.id,
                    loaded: {
                        $between: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                };
                var iAttributes = { exclude: ['createdAt', 'updatedAt', 'data'] };
                BPAWorkQueueItemRepo.getAll(iConditions, iAttributes, (err, rawData) => {
                    if (err) {
                        res.json(err.toString());
                    } else {
                        var uniqueData = _.uniqBy(rawData, 'keyvalue');
                        queue[queueName] = uniqueData;
                        _.forEach(rawData, function (item) {
                            rawArr.push(item);
                        });
                        globalCount--;
                        if (globalCount == Constants.number.ZERO) {
                            doneIteratingFcn(queue, rawArr);
                        }
                    }
                });
            }
        });
    };

    var doneIteratingFcn = function (_queue, _rawArr) {
        console.log("doneIteration");
        let totalCases = _.uniqBy(_rawArr, 'keyvalue').length;
        let completedByBot = _queue[Constants.BO.PostContract].length;
        var baiAlAjeilEsr = {
            left_heading: 'Bae Al Ajel',
            totalCases: totalCases,
            botScope: totalCases,
            botRecievedPercentage: Constants.NUMBER_HUNDRED,
            completedByBot: completedByBot,
            sucessPerOnBotScopeVolume: _.round(completedByBot / totalCases * Constants.NUMBER_HUNDRED),
            sucessPerOnTotalVolume: _.round(completedByBot / totalCases * Constants.NUMBER_HUNDRED),
            reassignedByBot: totalCases - completedByBot,
            totalWithHumans: totalCases - completedByBot
        }
        res.json({
            success: true,
            msg: 'Data found',
            data: baiAlAjeilEsr
        });
    };

    async.forEach(Constants.BO.QUEUES_ARR, iteratorFcn, doneIteratingFcn);
}

module.exports.ccMsd = function (req, res) {
    CCServiceUtil.msdUtil(req, (err, _data) => {
        if (err) {
            res.json({
                sucess: false,
                msg: 'Error: ' + err
            });
        } else if (_data) {
            let totalCases = 0;
            let completedByBot = 0;
            _.forEach(_data, function (item) {
                if (item.left_heading == 'Total') {
                    totalCases = item.volume;
                    completedByBot = item.closed + item.rejected;
                }
            });
            var _ccMsdEsr = {
                left_heading: 'Contact Center - MSD',
                totalCases: totalCases,
                botScope: totalCases,
                botRecievedPercentage: Constants.NUMBER_HUNDRED,
                completedByBot: completedByBot,
                sucessPerOnBotScopeVolume: _.round((completedByBot / totalCases) * Constants.NUMBER_HUNDRED),
                sucessPerOnTotalVolume: _.round((completedByBot / totalCases) * Constants.NUMBER_HUNDRED),
                reassignedByBot: totalCases - completedByBot,
                totalWithHumans: totalCases - completedByBot
            };
            res.json({
                sucess: false,
                msg: 'Sucess',
                data: _ccMsdEsr
            });
        }
    });
}

module.exports.ccNonMsd = function (req, res) {
    CCServiceUtil.nonMsdUtil(req, (err, _data) => {
        if (err) {
            res.json({
                sucess: false,
                msg: 'Error: ' + err
            });
        } else if (_data) {
            let totalCases = 0;
            let completedByBot = 0;
            _.forEach(_data, function (item) {
                if (item.left_heading == 'Total') {
                    totalCases = item.total;
                    completedByBot = item.completed;
                }
            });
            var _ccNonMsdEsr = {
                left_heading: 'Contact Center - Non MSD',
                totalCases: Constants.NOT_APPLICABLE,
                botScope: totalCases,
                botRecievedPercentage: Constants.NOT_APPLICABLE,
                completedByBot: completedByBot,
                sucessPerOnBotScopeVolume: _.round(completedByBot / totalCases * Constants.NUMBER_HUNDRED),
                sucessPerOnTotalVolume: Constants.NOT_APPLICABLE,
                reassignedByBot: totalCases - completedByBot,
                totalWithHumans: Constants.NOT_APPLICABLE
            };
            res.json({
                sucess: false,
                msg: 'Sucess',
                data: _ccNonMsdEsr
            });
        }
    });
}

module.exports.lgReleaserEsr = function (req, res) {
    res.json({
        sucess: false,
        msg: 'Sucess',
        data: {
            left_heading: 'Trade Operations - LG Issuance and Amendment',
            totalCases: 70,
            botScope: 36,
            botRecievedPercentage: 51,
            completedByBot: 34,
            sucessPerOnBotScopeVolume: 94,
            sucessPerOnTotalVolume: 49,
            reassignedByBot: 2,
            totalWithHumans: 36
        }
    });
}

module.exports.lgClosureEsr = function (req, res) {
    res.json({
        sucess: false,
        msg: 'Sucess',
        data: {
            left_heading: 'Trade Operations - LG Closure',
            totalCases: Constants.NOT_APPLICABLE,
            botScope: 36,
            botRecievedPercentage: 51,
            completedByBot: Constants.NOT_APPLICABLE,
            sucessPerOnBotScopeVolume: 94,
            sucessPerOnTotalVolume: Constants.NOT_APPLICABLE,
            reassignedByBot: 2,
            totalWithHumans: Constants.NOT_APPLICABLE
        }
    });
}

module.exports.importLcExportLcEsr = function (req, res) {
    res.json({
        sucess: false,
        msg: 'Sucess',
        data: {
            left_heading: 'Trade Operations - Settlements',
            totalCases: Constants.NOT_APPLICABLE,
            botScope: 36,
            botRecievedPercentage: Constants.NOT_APPLICABLE,
            completedByBot: 34,
            sucessPerOnBotScopeVolume: 94,
            sucessPerOnTotalVolume: Constants.NOT_APPLICABLE,
            reassignedByBot: 2,
            totalWithHumans: Constants.NOT_APPLICABLE
        }
    });
}

module.exports.amlKycEsr = function (req, res) {
    res.json({
        sucess: false,
        msg: 'Sucess',
        data: {
            left_heading: 'AML - KYC',
            totalCases: 70,
            botScope: 36,
            botRecievedPercentage: 51,
            completedByBot: 34,
            sucessPerOnBotScopeVolume: 94,
            sucessPerOnTotalVolume: 49,
            reassignedByBot: 2,
            totalWithHumans: 36
        }
    });
}

module.exports.boOthersEsr = function (req, res) {
    res.json({
        sucess: false,
        msg: 'Sucess',
        data: {
            left_heading: 'BO Others',
            totalCases: Constants.NOT_APPLICABLE,
            botScope: 36,
            botRecievedPercentage: Constants.NOT_APPLICABLE,
            completedByBot: 34,
            sucessPerOnBotScopeVolume: 94,
            sucessPerOnTotalVolume: Constants.NOT_APPLICABLE,
            reassignedByBot: 2,
            totalWithHumans: Constants.NOT_APPLICABLE
        }
    });
}