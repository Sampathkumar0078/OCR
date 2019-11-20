var BPAWorkQueueRepo = require('../Repository/BPAWorkQueueRepo');
var BPAWorkQueueItemRepo = require('../Repository/BPAWorkQueueItemRepo');
var BPACaseLockRepo = require('../Repository/BPACaseLockRepo');
var fs = require('fs-extra');
var xlsxj = require('xlsx-to-json-lc');
const Constants = require('../Config/Constants');
var _ = require('lodash');
var async = require('async');
var util = require('util');
const addSubtractDate = require("add-subtract-date");

module.exports.nonMsdUtil = function (req, callback) {
    var reports = [];
    var _grandTotal = {
        left_heading: 'Total',
        completed: 0,
        exception: 0,
        processing: 0,
        pending: 0,
        total: 0
    };
    var globalCount = Constants.CC.QUEUES_ARR.length;
    var iteratorFcn = function (queueName, done) {
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
                callback(err, Constants.NULL);
            } else if (!_.isUndefined(_queue) && !_.isUndefined(_queue.id)) {
                var iConditions = {
                    queueid: _queue.id,
                    loaded: {
                        $between: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                    }
                };
                var iAttributes = { exclude: ['createdAt', 'updatedAt'] };
                var caseLockAttributes = ['id'];
                BPACaseLockRepo.getAll({}, caseLockAttributes, (err, caseLocks) => {
                    if (err) {
                        callback(err, Constants.NULL);
                    } else {
                        var caseLockedIds = _.map(caseLocks, 'id');
                        BPAWorkQueueItemRepo.getAll(iConditions, iAttributes, (err, rawData) => {
                            if (err) {
                                callback(err, Constants.NULL);
                            } else if (!_.isEmpty(rawData)) {
                                /* filter completed */
                                var completed = _.reject(rawData, { completed: null });
                                var exception = _.reject(rawData, { exception: null });
                                var processing = _.filter(rawData, item => _.includes(caseLockedIds, item.ident));
                                _dataToPush = {
                                    left_heading: queueName,
                                    completed: completed.length,
                                    exception: exception.length,
                                    processing: processing.length,
                                    pending: rawData.length - (completed.length + exception.length + processing.length),
                                    total: rawData.length
                                }
                                /* Sum of all */
                                _grandTotal.left_heading = 'Total';
                                _grandTotal.total += rawData.length;
                                _grandTotal.completed += completed.length;
                                _grandTotal.exception += exception.length;
                                _grandTotal.processing += processing.length;
                                _grandTotal.pending += rawData.length - (completed.length + exception.length + processing.length);

                                reports.push(_dataToPush)
                                globalCount--;
                                if (globalCount == Constants.number.ZERO) {
                                    reports.push(_grandTotal);
                                    doneIteratingFcn(reports);
                                }
                                console.log(reports);
                            } else {
                                callback(Constants.NULL, 'No records found');
                            }
                        });
                    }
                });
            }
        });
    };

    var doneIteratingFcn = function (_reports) {
        callback(Constants.NULL, _reports);
    };

    async.forEach(Constants.CC.QUEUES_ARR, iteratorFcn, doneIteratingFcn);
}

module.exports.msdUtil = function (req, callback) {
    fs.readJSON(Constants.CC.pathsJSON, (err, _data) => {
        if (err) {
            callback(err, Constants.NULL);
        } else if (_data) {
            var excels = [_data];
            var output = {
                ammendInstallments: {
                    left_heading: 'AI',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                cashAcceptanceClaims: {
                    left_heading: 'CAC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                changeProduct: {
                    left_heading: 'CP',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                enableCc: {
                    left_heading: 'E-CC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                linkContracts: {
                    left_heading: 'LC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                merchantClaims: {
                    left_heading: 'MC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                noc: {
                    left_heading: 'NOC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                partialPayment: {
                    left_heading: 'PP',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                reIssueCreditCard: {
                    left_heading: 'R-CC',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                Total: {
                    left_heading: 'Total',
                    volume: 0,
                    closed: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                }
            };

            var globalCount = 0;
            var rawResult = [];
            var iteratorFcn = function (data, done) {
                console.log("IterationFcn");
                globalCount = data.ammendInstallments.length +
                    data.cashAcceptanceClaims.length +
                    data.changeProduct.length +
                    data.enableCc.length +
                    data.linkContracts.length +
                    data.merchantClaims.length +
                    data.noc.length +
                    data.partialPayment.length +
                    data.reIssueCreditCard.length;
                if (data.ammendInstallments && data.ammendInstallments.length > 0) {
                    _.forEach(data.ammendInstallments, function (ammendInstallmentsItem) {
                        if (fs.existsSync(ammendInstallmentsItem)) {
                            xlsxj({
                                input: ammendInstallmentsItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    callback(err, Constants.NULL);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var ai_closed = _.filter(result, { status: "Closed" });
                                    var ai_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.ammendInstallments.volume += result.length;
                                    output.ammendInstallments.closed += ai_closed.length;
                                    output.ammendInstallments.reassigned += ai_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += ai_closed.length;
                                    output.Total.reassigned += ai_reassigned.length;

                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn(null, globalCount) : null;
                                }
                            });
                        }
                    });
                }
                if (data.cashAcceptanceClaims && data.cashAcceptanceClaims.length > 0) {
                    _.forEach(data.cashAcceptanceClaims, function (cashAcceptanceClaimsItem) {
                        if (fs.existsSync(cashAcceptanceClaimsItem)) {
                            xlsxj({
                                input: cashAcceptanceClaimsItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    callback(err, Constants.NULL);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var cac_closed = _.filter(result, { status: "Closed" });
                                    var cac_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.cashAcceptanceClaims.volume += result.length;
                                    output.cashAcceptanceClaims.closed += cac_closed.length;
                                    output.cashAcceptanceClaims.reassigned += cac_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += cac_closed.length;
                                    output.Total.reassigned += cac_reassigned.length;

                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.changeProduct && data.changeProduct.length > 0) {
                    _.forEach(data.changeProduct, function (changeProductItem) {
                        if (fs.existsSync(changeProductItem)) {
                            xlsxj({
                                input: changeProductItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var cp_closed = _.filter(result, { status: "Closed" });
                                    var cp_reassigned = _.filter(result, { status: "Reassigned" });
                                    // var processing = _.filter(result, item => _.includes(caseLocks, item.ident))
                                    output.changeProduct.volume += result.length;
                                    output.changeProduct.closed += cp_closed.length;
                                    output.changeProduct.reassigned += cp_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += cp_closed.length;
                                    output.Total.reassigned += cp_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.enableCc && data.enableCc.length > 0) {
                    _.forEach(data.enableCc, function (enableCcItem) {
                        if (fs.existsSync(enableCcItem)) {
                            xlsxj({
                                input: enableCcItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var ecc_closed = _.filter(result, { status: "Closed" });
                                    var ecc_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.enableCc.volume += result.length;
                                    output.enableCc.closed += ecc_closed.length;
                                    output.enableCc.reassigned += ecc_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += ecc_closed.length;
                                    output.Total.reassigned += ecc_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.linkContracts && data.linkContracts.length > 0) {
                    _.forEach(data.linkContracts, function (linkContractsItem) {
                        if (fs.existsSync(linkContractsItem)) {
                            xlsxj({
                                input: linkContractsItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var lc_closed = _.filter(result, { status: "Closed" });
                                    var lc_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.linkContracts.volume += result.length;
                                    output.linkContracts.closed += lc_closed.length;
                                    output.linkContracts.reassigned += lc_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += lc_closed.length;
                                    output.Total.reassigned += lc_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.merchantClaims && data.merchantClaims.length > 0) {
                    _.forEach(data.merchantClaims, function (merchantClaimsItem) {
                        if (fs.existsSync(merchantClaimsItem)) {
                            xlsxj({
                                input: merchantClaimsItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var mc_closed = _.filter(result, { status: "Closed" });
                                    var mc_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.merchantClaims.volume += result.length;
                                    output.merchantClaims.closed += mc_closed.length;
                                    output.merchantClaims.reassigned += mc_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += mc_closed.length;
                                    output.Total.reassigned += mc_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.noc && data.noc.length > 0) {
                    _.forEach(data.noc, function (nocItem) {
                        if (fs.existsSync(nocItem)) {
                            xlsxj({
                                input: nocItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    /* Elemenating out of scope data */
                                    var inScopeData = _.filter(result, item => _.includes(Constants.CC.noc.outScopeReassignedReasons, item.remarks))

                                    var noc_closed = _.filter(result, { status: "Closed" });
                                    var noc_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.noc.volume += result.length;
                                    output.noc.closed += noc_closed.length + inScopeData.length; // Adding in scope re-assigned to closed.
                                    output.noc.reassigned += noc_reassigned.length - inScopeData.length; //Substracting inscope values from re-assigned.

                                    output.Total.volume += result.length;
                                    output.Total.closed += noc_closed.length + inScopeData.length;
                                    output.Total.reassigned += noc_reassigned.length - inScopeData.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.partialPayment && data.partialPayment.length > 0) {
                    _.forEach(data.partialPayment, function (partialPaymentItem) {
                        if (fs.existsSync(partialPaymentItem)) {
                            xlsxj({
                                input: partialPaymentItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var pp_closed = _.filter(result, { status: "Closed" });
                                    var pp_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.partialPayment.volume += result.length;
                                    output.partialPayment.closed += pp_closed.length;
                                    output.partialPayment.reassigned += pp_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += pp_closed.length;
                                    output.Total.reassigned += pp_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.reIssueCreditCard && data.reIssueCreditCard.length > 0) {
                    _.forEach(data.reIssueCreditCard, function (reIssueCreditCardItem) {
                        if (fs.existsSync(reIssueCreditCardItem)) {
                            xlsxj({
                                input: reIssueCreditCardItem,
                                output: Constants.CC.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    console.log("Error : " + err);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var rcc_closed = _.filter(result, { status: "Closed" });
                                    var rcc_reassigned = _.filter(result, { status: "Reassigned" });
                                    output.reIssueCreditCard.volume += result.length;
                                    output.reIssueCreditCard.closed += rcc_closed.length;
                                    output.reIssueCreditCard.reassigned += rcc_reassigned.length;

                                    output.Total.volume += result.length;
                                    output.Total.closed += rcc_closed.length;
                                    output.Total.reassigned += rcc_reassigned.length;


                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
            };

            var doneIteratingFcn = function () {
                console.log("doneIteration");
                var tableData = [];
                tableData.push(output.ammendInstallments);
                tableData.push(output.cashAcceptanceClaims);
                tableData.push(output.changeProduct);
                tableData.push(output.enableCc);
                tableData.push(output.linkContracts);
                tableData.push(output.merchantClaims);
                tableData.push(output.noc);
                tableData.push(output.partialPayment);
                tableData.push(output.reIssueCreditCard);
                tableData.push(output.Total);

                setTimeout(() => {
                    callback(Constants.NULL, tableData);
                    console.log(util.inspect(output, false, null, true /* enable colors */));
                }, 0000);
                // }
            };

            async.forEach(excels, iteratorFcn, doneIteratingFcn);
        }
    });
}