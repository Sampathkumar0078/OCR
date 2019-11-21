
var fs = require('fs-extra');
var xlsxj = require('xlsx-to-json-lc');
const Constants = require('../Config/Constants');
var _ = require('lodash');
var async = require('async');
var util = require('util');

module.exports.reportsoFPo = function (req, callback) {
    fs.readJSON(Constants.PO.pathsJSON, (err, _data) => {
        if (err) {
            console.log(err);
        } else if (_data) {
            var excels = [_data];
            var output = {
                watani2: {
                    volume: 0,
                    approved: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                autoLeasing: {
                    volume: 0,
                    approved: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                mrcc: {
                    volume: 0,
                    approved: 0,
                    rejected: 0,
                    reassigned: 0,
                    botSucessPercentage: 0,
                    botReassignedPercentage: 0,
                },
                grandTotal: {
                    totalVolume: 0,
                    totalApproved: 0,
                    totalRejected: 0,
                    totalReassigned: 0,
                    totalBotSucessPercentage: 0,
                    totalBotReassignedPercentage: 0
                    
                }
            };

            var globalCount = 0;
            var rawResult = [];
            var iteratorFcn = function (data, done) {
                console.log("IterationFcn");
                globalCount = data.watani2.length + data.autoLeasing.length + data.mrcc.length;
                if (data.watani2 && data.watani2.length > 0) {
                    _.forEach(data.watani2, function (wataniItem) {
                        if (fs.existsSync(wataniItem)) {
                            xlsxj({
                                input: wataniItem,
                                output: Constants.PO.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    callback("Error : " + err, Constants.NULL);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var w2_approved = _.filter(result, { status: "Approved" });
                                    var w2_reassigned = _.filter(result, { status: "Reassign" });
                                    var w2_rejected = _.filter(result, { status: "Rejected" });
                                    output.watani2.approved += w2_approved.length;
                                    output.watani2.reassigned += w2_reassigned.length;
                                    output.watani2.rejected += w2_rejected.length;
                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn(null, globalCount) : null;
                                }
                            });
                        }
                    });
                }
                if (data.autoLeasing && data.autoLeasing.length > 0) {
                    _.forEach(data.autoLeasing, function (autoLeasingItem) {
                        if (fs.existsSync(autoLeasingItem)) {
                            xlsxj({
                                input: autoLeasingItem,
                                output: Constants.PO.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    callback("Error : " + err, Constants.NULL);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var al_approved = _.filter(result, { status: "Approved" });
                                    var al_reassigned = _.filter(result, { status: "Reassign" });
                                    var al_rejected = _.filter(result, { status: "Rejected" });
                                    output.autoLeasing.approved += al_approved.length;
                                    output.autoLeasing.reassigned += al_reassigned.length;
                                    output.autoLeasing.rejected += al_rejected.length;
                                    globalCount -= 1;
                                    globalCount == 0 ? doneIteratingFcn() : null;
                                }
                            });
                        }
                    });
                }
                if (data.mrcc && data.mrcc.length > 0) {
                    _.forEach(data.mrcc, function (mrcciItem) {
                        if (fs.existsSync(mrcciItem)) {
                            xlsxj({
                                input: mrcciItem,
                                output: Constants.PO.outPutTxt,
                                lowerCaseHeaders: true
                            }, function (err, result) {
                                if (err)
                                    callback("Error : " + err, Constants.NULL);
                                else if (result) {
                                    rawResult = _.concat(rawResult, result);
                                    var mrcc_approved = _.filter(result, { status: "Approved" });
                                    var mrcc_reassigned = _.filter(result, { status: "Reassign" });
                                    var mrcc_rejected = _.filter(result, { status: "Rejected" });
                                    output.mrcc.approved += mrcc_approved.length;
                                    output.mrcc.reassigned += mrcc_reassigned.length;
                                    output.mrcc.rejected += mrcc_rejected.length;
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
                // if (err) {
                //     res.json({
                //         sucess: false
                //     });
                // } else {

                // Watani2 %
                output.watani2.volume = output.watani2.approved + output.watani2.rejected + output.watani2.reassigned
                output.watani2.botSucessPercentage = Math.round((output.watani2.approved + output.watani2.rejected) / output.watani2.volume * Constants.NUMBER_HUNDRED);

                output.watani2.botReassignedPercentage = Math.round((output.watani2.reassigned) / output.watani2.volume * Constants.NUMBER_HUNDRED);

                // Auto Leasing %
                output.autoLeasing.volume = output.autoLeasing.approved + output.autoLeasing.rejected + output.autoLeasing.reassigned;
                output.autoLeasing.botSucessPercentage = Math.round((output.autoLeasing.approved + output.autoLeasing.rejected) / output.autoLeasing.volume * Constants.NUMBER_HUNDRED);

                output.autoLeasing.botReassignedPercentage = Math.round((output.autoLeasing.reassigned) / output.autoLeasing.volume * Constants.NUMBER_HUNDRED);

                // MRCC %
                output.mrcc.volume = output.mrcc.approved + output.mrcc.rejected + output.mrcc.reassigned;
                output.mrcc.botSucessPercentage = Math.round((output.mrcc.approved + output.mrcc.rejected) / output.mrcc.volume * Constants.NUMBER_HUNDRED);

                output.mrcc.botReassignedPercentage = Math.round((output.mrcc.reassigned) / output.mrcc.volume * Constants.NUMBER_HUNDRED);

                // TOTAL %
                output.grandTotal.totalApproved = output.watani2.approved + output.autoLeasing.approved + output.mrcc.approved;
                output.grandTotal.totalRejected = output.watani2.rejected + output.autoLeasing.rejected + output.mrcc.rejected;
                output.grandTotal.totalReassigned = output.watani2.reassigned + output.autoLeasing.reassigned + output.mrcc.reassigned;
                output.grandTotal.totalVolume = output.watani2.volume + output.autoLeasing.volume + output.mrcc.volume;
                output.grandTotal.totalBotSucessPercentage = Math.round((output.grandTotal.totalApproved + output.grandTotal.totalRejected) / output.grandTotal.totalVolume * Constants.NUMBER_HUNDRED);
                output.grandTotal.totalBotReassignedPercentage = Math.round((output.grandTotal.totalReassigned) / output.grandTotal.totalVolume * Constants.NUMBER_HUNDRED);

                setTimeout(() => {
                    // var source = EmailTemplate.PO_REPORT_TEMPLATE;
                    // var template = handlebars.compile(source);
                    // var htmlData = {
                    //     w_approved: output.watani2.approved,
                    //     w_rejected: output.watani2.rejected,
                    //     w_botSuccessPercentage: output.watani2.botSucessPercentage,
                    //     w_reassigned: output.watani2.reassigned,
                    //     w_botreassignedPercentage: output.watani2.botReassignedPercentage,
                    //     w_volume: output.watani2.volume,
                    //     a_approved: output.autoLeasing.approved,
                    //     a_rejected: output.autoLeasing.rejected,
                    //     a_botSuccessPercentage: output.autoLeasing.botSucessPercentage,
                    //     a_reassigned: output.autoLeasing.reassigned,
                    //     a_botreassignedPercentage: output.autoLeasing.botSucessPercentage,
                    //     a_volume: output.autoLeasing.volume,
                    //     m_approved: output.mrcc.approved,
                    //     m_rejected: output.mrcc.rejected,
                    //     m_botSuccessPercentage: output.mrcc.botSucessPercentage,
                    //     m_reassigned: output.mrcc.reassigned,
                    //     m_botreassignedPercentage: output.mrcc.botSucessPercentage,
                    //     m_volume: output.mrcc.volume,
                    //     total_approved: output.grandTotal.totalApproved,
                    //     total_rejected: output.grandTotal.totalRejected,
                    //     total_botSuccessPercentage: output.grandTotal.totalBotSucessPercentage,
                    //     total_reassigned: output.grandTotal.totalReassigned,
                    //     total_botreassignedPercentage: output.grandTotal.totalBotReassignedPercentage,
                    //     total_volume: output.grandTotal.totalVolume
                    // };
                    // var prehtml = template(htmlData); // lafyshahid@gmail.com, sampathch31@gmail.com
                    // MailSender.sendMail("sharathvaddireddy@gmail.com ", '', 'Report | Product Operations', prehtml);
                    callback(Constants.NULL, output);
                    console.log(util.inspect(output, false, null, true /* enable colors */));
                }, 0000);
                // }
            };

            async.forEach(excels, iteratorFcn, doneIteratingFcn);
        }
    });
}