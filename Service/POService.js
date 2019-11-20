var BPAWorkQueueRepo = require('../Repository/BPAWorkQueueItemRepo');
var BPASessionRepo = require('../Repository/BPASessionRepo');
var BPAResourceRepo = require('../Repository/BPAResourceRepo');
var POServiceUtil = require('../Service/POServiceUtil');
var fs = require('fs-extra');
var xlsxj = require('xlsx-to-json-lc');
const Constants = require('../Config/Constants');
var _ = require('lodash');
var async = require('async');
var util = require('util');

module.exports.scheduler = function (req, res) {
    // var j = schedule.scheduleJob({ rule: '0-59/10 0-59/0 0-23/0 * * *' }, function () {
    //pathBuilder.getTodaysPaths('', (_watani2, _autoLeasing, _mrcc) => { // for production

    var _watani2 = [];
    var _autoLeasing = [];
    var _mrcc = [];

    var logFolders = Constants.folders;

    var date = new Date();
    var currentFolderDate = date.getDate() + Constants.MONTHS[date.getMonth()] + date.getFullYear();

    _.forEach(logFolders, function (folder) {
        fs.readdir(folder, (err, files) => {
            _.forEach(files, function (file) {
                switch (folder) {
                    case Constants.PO.watani2.staticFolderName:
                        // _watani2.push(Constants.shareFolderPath + Constants.PO.watani2.subPath + file);
                        _watani2.push(Constants.PO.watani2.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.PO.autoLeasing.staticFolderName:
                        // _autoLeasing.push(Constants.shareFolderPath + Constants.PO.autoLeasing.subPath + file);
                        _autoLeasing.push(Constants.PO.autoLeasing.staticFolderName + currentFolderDate + "\\" + file);
                        break;
                    case Constants.PO.mrcc.staticFolderName:
                        // _mrcc.push(Constants.shareFolderPath + Constants.PO.mrcc.subPath + file);
                        _mrcc.push(Constants.PO.mrcc.staticFolderName + currentFolderDate + "\\" + file);
                }
            });

        })
    });

    setTimeout(function () {
        var data = {
            watani2: _watani2,
            autoLeasing: _autoLeasing,
            mrcc: _mrcc
        }
        fs.writeJSON(Constants.PO.output, data, (err, out) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    sucess: true,
                    msg: "Wrote to PO.json"
                })
            }
        });
    }, 500)
}

module.exports.getVolumeReport = function (req, res) {
    POServiceUtil.reportsoFPo(req, (err, _report) => {
        if (err){
            res.json({
                sucess: false,
                msg: 'Error: '+ err
            })
        } else if(_report) {
            res.json({
                sucess: true,
                msg: 'Sucess',
                data: _report
            });
        }
    })
}


module.exports.isLogsUpdated = function (req, res) {
    fs.readJSON(Constants.PO.pathsJSON, (err, _data) => {
        if (err) {
            console.log(err);
        } else if (_data) {
            var excels = [_data];
            var globalCount = 0;
            var hangedProfiles = [];
            var currentTime = new Date().getTime();
            var iteratorFcn = function (data, done) {
                console.log("IterationFcn");
                globalCount = data.watani2.length + data.autoLeasing.length + data.mrcc.length;
                if (data.watani2 && data.watani2.length > 0) {
                    _.forEach(data.watani2, function (wataniItem) {
                        if (fs.existsSync(wataniItem)) {
                            const dirTime = fs.statSync(wataniItem).mtime.getTime();
                            (currentTime - dirTime) >= Constants.MINUTES_15 ? hangedProfiles.push(wataniItem.replace(Constants.FILE_NAME_REGEX, '').split('_').slice(0, -1).join('_')) : null;
                            globalCount -= 1;
                            globalCount == 0 ? doneIteratingFcn() : null;
                        }
                    });
                }
                if (data.autoLeasing && data.autoLeasing.length > 0) {
                    _.forEach(data.autoLeasing, function (autoLeasingItem) {
                        if (fs.existsSync(autoLeasingItem)) {
                            const dirTime = fs.statSync(autoLeasingItem).mtime.getTime();
                            (currentTime - dirTime) >= Constants.MINUTES_15 ? hangedProfiles.push(autoLeasingItem.replace(Constants.FILE_NAME_REGEX, '').split('_').slice(0, -1).join('_')) : null;
                            globalCount -= 1;
                            globalCount == 0 ? doneIteratingFcn() : null;
                        }
                    });
                }
                if (data.mrcc && data.mrcc.length > 0) {
                    _.forEach(data.mrcc, function (mrcciItem) {
                        if (fs.existsSync(mrcciItem)) {
                            const dirTime = fs.statSync(mrcciItem).mtime.getTime();
                            (currentTime - dirTime) >= Constants.MINUTES_15 ? hangedProfiles.push(mrcciItem.replace(Constants.FILE_NAME_REGEX, '').split('_').slice(0, -1).join('_')) : null;
                            globalCount -= 1;
                            globalCount == 0 ? doneIteratingFcn() : null;
                        }
                    });
                }
            };

            var doneIteratingFcn = function () {
                console.log("doneIteration");
                setTimeout(() => {
                    res.json(_.isEmpty(hangedProfiles) ? { sucess: true, msg: 'Up to date', data: null } : { sucess: true, msg: 'Sucess', data: hangedProfiles }
                    );
                }, 0000);
                // }
            };

            async.forEach(excels, iteratorFcn, doneIteratingFcn);
        }
    });
}

module.exports.gethangedvms = function (req, res) {
    BPASessionRepo.gethangedvms(req, (err, _data) => {
        if (err) {
            res.json({
                sucess: true,
                msg: err.toString(),
            });
        } else if (_data) {
            var resourceIds = [];
            _.forEach(_data, function (item) {
                console.log(item.runningresourceid);
                resourceIds.push(item.runningresourceid);
            });
            BPAResourceRepo.getResourceNames(resourceIds, (err, names) => {
                if (err) {
                    res.json({
                        sucess: true,
                        msg: err.toString(),
                    });
                } else if (names) {
                    res.json({
                        sucess: true,
                        msg: 'Sucess',
                        data: names
                    });
                }
            });
        }
    });
}