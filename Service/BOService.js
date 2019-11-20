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
const addSubtractDate = require("add-subtract-date");

module.exports.getQueuesException = function (req, res) {
    // BPAWorkQueueItemRepo.getQueueDetails(req, (err, wqData) => {
    //     if (err) {
    //         res.json(ErrLogger(err.toString()));
    //     } else if (wqData) {
    //         var exceptions = _.reject(wqData, { exception: null });
    //         // console.log(exceptions.length);
    //         res.json({
    //             success: true,
    //             msg: 'Success',
    //             data: exceptions
    //         });
    //     }
    // });
    var exceptions = {};
    var globalCount = Constants.BO.QUEUES_ARR.length;
    var iteratorFcn = function (queueName, done) {
        /* Create current date mssql format */
        var date = new Date();
        var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var addOneDay = addSubtractDate.add(date, 1, Constants.DAYS_STR);
        var nextDate = addOneDay.getFullYear() + '-' + ((addOneDay.getMonth() + 1) < Constants.number.TEN ? '0' + (addOneDay.getMonth() + 1) : (addOneDay.getMonth() + 1)) + '-' + (addOneDay.getDate() < 10 ? '0' + addOneDay.getDate() : addOneDay.getDate());

        // console.log(currentDate + ' ' + Constants.START_TIME_OF_DAY);
        // console.log(nextDate + ' ' + Constants.START_TIME_OF_DAY);

        var conditions = {
            name: queueName
        };
        var attributes = ['id'];
        BPAWorkQueueRepo.get(conditions, attributes, (err, _queue) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (!_.isUndefined(_queue) && !_.isUndefined(_queue.id)) {
                var iConditions = {
                    queueid: _queue.id,
                    loaded: {
                        $between: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                };
                var iAttributes = { exclude: ['createdAt', 'updatedAt','data'] };
                BPAWorkQueueItemRepo.getAll(iConditions, iAttributes, (err, rawData) => {
                    if (err) {
                        res.json(ErrLogger(err.toString()));
                    } else {
                        rawExceptions = _.reject(rawData, { exception: null });
                        queueName == Constants.BO.preContract ? exceptions.preExceptions = rawExceptions : null;
                        queueName == Constants.BO.PostContract ? exceptions.postExceptions = rawExceptions : null;
                        globalCount--;
                        if (globalCount == Constants.number.ZERO) {
                            doneIteratingFcn(exceptions);
                        }
                        console.log(exceptions);
                    }
                });
            }
        });
    };

    var doneIteratingFcn = function (_exceptions) {
        console.log("doneIteration");
        res.json({
            success: true,
            msg: 'Data found',
            data: _exceptions
        });
    };

    async.forEach(Constants.BO.QUEUES_ARR, iteratorFcn, doneIteratingFcn);
}

module.exports.getPrePostCount = function (req, res) {
    // var date = new Date();
    // var day = date.getDate();
    // // var day = 14;
    // var month = Constants.MONTHS[date.getMonth()];
    // var fullYear = date.getFullYear();
    // var _date = day + month + fullYear;
    // xlsxj({
    //     input: Constants.BAI_AJEL_INPUT_FILE_PATH.withoutDate + _date + Constants.extensions.XLS,
    //     output: Constants.BAI_AJEL_INPUT_FILE_PATH.output,
    //     lowerCaseHeaders: true
    // }, function (err, result) {
    //     if (err) {
    //         res.json(ErrLogger(err.toString()));
    //         console.log("Error : " + err);
    //     }
    //     else if (result) {
    //         var preContracts = Constants.INT_ZERO;
    //         var postContracts = Constants.INT_ZERO;
    //         _.forEach(result, function (o) {
    //             if ((o["status name"] != Constants.BA_STATUSES.OA_Processing || o["status name"] == Constants.BA_STATUSES.OA_Processing || o["status name"] == Constants.BA_STATUSES.Com_Buy_Processing) && (o.bb == Constants.BOOlEAN_YES && o.hc == Constants.BOOlEAN_YES)) {
    //                 preContracts++;
    //             }
    //             if (!_.isUndefined(o.oa)) {
    //                 postContracts++;
    //             }
    //         });
    //         res.json({
    //             success: true,
    //             msg: "Sucess",
    //             date: {
    //                 "Pre Contracts": preContracts,
    //                 "Post Contracts": postContracts
    //             }
    //         });
    //     }
    // });

    var contracts = {};
    var globalCount = Constants.BO.QUEUES_ARR.length;
    var iteratorFcn = function (queueName, done) {
        /* Create current date mssql format */
        var date = new Date();
        var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var addOneDay = addSubtractDate.add(date, 1, Constants.DAYS_STR);
        var nextDate = addOneDay.getFullYear() + '-' + ((addOneDay.getMonth() + 1) < Constants.number.TEN ? '0' + (addOneDay.getMonth() + 1) : (addOneDay.getMonth() + 1)) + '-' + (addOneDay.getDate() < 10 ? '0' + addOneDay.getDate() : addOneDay.getDate());

        console.log(currentDate + ' ' + Constants.START_TIME_OF_DAY);
        console.log(nextDate + ' ' + Constants.START_TIME_OF_DAY);

        var conditions = {
            name: queueName
        };
        var attributes = ['id'];
        BPAWorkQueueRepo.get(conditions, attributes, (err, _queue) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (!_.isUndefined(_queue) && !_.isUndefined(_queue.id)) {
                var iConditions = {
                    queueid: _queue.id,
                    loaded: {
                        $between: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                };
                var iAttributes = { exclude: ['createdAt', 'updatedAt'] };

                BPAWorkQueueItemRepo.getAll(iConditions, iAttributes, (err, rawData) => {
                    if (err) {
                        res.json(ErrLogger(err.toString()));
                    } else {
                        queueName == Constants.BO.preContract ? contracts.preContracts = rawData.length : 0;
                        queueName == Constants.BO.PostContract ? contracts.postContracts = rawData.length : 0;
                        globalCount--;
                        if (globalCount == Constants.number.ZERO) {
                            doneIteratingFcn(contracts);
                        }
                        console.log(contracts);
                    }
                });
            }
        });
    };

    var doneIteratingFcn = function (_contracts) {
        console.log("doneIteration");
        res.json({
            success: true,
            msg: 'Data found',
            data: _contracts
        });
    };

    async.forEach(Constants.BO.QUEUES_ARR, iteratorFcn, doneIteratingFcn);
}

module.exports.getCurrentStatus = function (req, res) {
    BPASessionLog_NonUnicodeRepo.getCurrentStatus(req, (err, _status) => {
        if (err) {
            res.json(ErrLogger(err.toString()));
        } else if (_status) {
            if (!_.isUndefined(_status.result)) {
                var date1 = _status.startdatetime
                var date2 = new Date();
                var diff = new DateDiff(date2, date1);
                var minDiff = diff.minutes();
                if (minDiff >= Constants.SAMA.TIME_INTERVAL) {
                    res.json({
                        success: false,
                        msg: 'Is not healthy',
                        data: Constants.COLOUR_CODE.RED
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'Healthy',
                        data: Constants.COLOUR_CODE.GREEN
                    });
                }
            }
        }
    });
}

module.exports.getSamaReports = function (req, res) {
    var reports = [];
    var globalCount = Constants.SAMA.QUEUES_ARR.length;
    var iteratorFcn = function (queueName, done) {
        /* Create current date mssql format */
        var date = new Date();
        var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var addOneDay = addSubtractDate.add(date, 1, Constants.DAYS_STR);
        var nextDate = addOneDay.getFullYear() + '-' + ((addOneDay.getMonth() + 1) < Constants.number.TEN ? '0' + (addOneDay.getMonth() + 1) : (addOneDay.getMonth() + 1)) + '-' + (addOneDay.getDate() < 10 ? '0' + addOneDay.getDate() : addOneDay.getDate());

        /* Create current date mssql format */
        // var date = new Date();
        // var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        // var hours = ((date.getHours() % Constants.number.TWELVE || Constants.number.TWELVE) < Constants.number.TEN ? '0' : '') + (date.getHours() % Constants.number.TWELVE || Constants.number.TWELVE);
        // var minutes = date.getMinutes() < Constants.number.TEN ? "0" + date.getMinutes() : date.getMinutes();
        // var seconds = date.getSeconds() < Constants.number.TEN ? "0" + date.getSeconds() : date.getSeconds();
        // var currentTime = hours + ":" + minutes + ":" + seconds;
        console.log(currentDate + ' ' + Constants.START_TIME_OF_DAY);
        console.log(nextDate + ' ' + Constants.START_TIME_OF_DAY);

        var conditions = {
            name: queueName
        };
        var attributes = ['id'];
        BPAWorkQueueRepo.get(conditions, attributes, (err, _queue) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (!_.isUndefined(_queue) && !_.isUndefined(_queue.id)) {
                var iConditions = {
                    queueid: _queue.id,
                    loaded: {
                        $between: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                };
                var iAttributes = { exclude: ['createdAt', 'updatedAt'] };
                var caseLockAttributes = ['id'];
                BPACaseLockRepo.getAll(null, caseLockAttributes, (err, caseLocks) => {
                    if (err) {
                        res.json(ErrLogger(err.toString()));
                    // } else if (!_.isEmpty(caseLocks)) {
                    } else {
                        var caseLockedIds = _.map(caseLocks, 'id');
                        BPAWorkQueueItemRepo.getAll(iConditions, iAttributes, (err, rawData) => {
                            if (err) {
                                res.json(ErrLogger(err.toString()));
                            } else {
                                /* filter completed */
                                // var completed = _.filter(rawData, { status: Constants.STATUS_NAMES.COMPLETED });
                                var completed = _.reject(rawData, { completed: null });
                                var exception = _.reject(rawData, { exception: null });
                                var processing = _.filter(rawData, item => _.includes(caseLockedIds, item.ident));
                                reports.push({
                                    left_heading: queueName,
                                    completed: completed.length,
                                    exception: exception.length,
                                    processing: processing.length,
                                    pending: rawData.length - (completed.length + exception.length + processing.length),
                                    total: rawData.length
                                });
                                globalCount--;
                                if (globalCount == Constants.number.ZERO) {
                                    doneIteratingFcn(reports);
                                }
                                console.log(reports);
                            } 
                            // else {
                            //     res.json({
                            //         success: true,
                            //         msg: 'No records found'
                            //     });
                            // }
                        });
                    }
                });
            }
        });
    };

    var doneIteratingFcn = function (_reports) {
        console.log("doneIteration");
        res.json({
            success: true,
            msg: 'Data found',
            data: _reports
        });
    };

    async.forEach(Constants.SAMA.QUEUES_ARR, iteratorFcn, doneIteratingFcn);
}