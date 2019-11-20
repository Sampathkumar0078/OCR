var BPAWorkQueueItemRepo = require('../Repository/BPAWorkQueueItemRepo');
var fs = require('fs-extra');
var xlsxj = require('xlsx-to-json-lc');
const Constants = require('../Config/Constants');
var _ = require('lodash');
var async = require('async');
var util = require('util');

module.exports.getVolumeReport = function (req, res) {
    BPAWorkQueueItemRepo.getQueueDetails(req, (err, _data) => {
        if (err) {
            res.json({
                sucess: true,
                msg: err.toString(),
            });
        } else if (_data) {
            res.json({
                sucess: true,
                msg: 'Sucess',
                data: _data
            });
        }
    });
}