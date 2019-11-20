var BPASessionLog_NonUnicode = require('../Models').BPASessionLog_NonUnicode;
const Constants = require('../Config/Constants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const _ = require('lodash');

module.exports.getCurrentStatus = function (req, callback) {
    BPASessionLog_NonUnicode.find(
        {
            where: {
                processname: { [Op.eq]: Constants.SAMA[req.params.process].processName },
                pagename: { [Op.eq]: Constants.SAMA[req.params.process].pageName },
                stagename: { [Op.eq]: Constants.SAMA[req.params.process].stageName }
            },
            order: [
                ['startdatetime', Constants.SORT.DESC]
            ]
        }
    ).then(_status => {
        callback(null, _status);
    });
}

module.exports.getTotalVolumeSama = function (callback) {
    BPASessionLog_NonUnicode.find(
        {
            where: {
                processname: { [Op.eq]: Constants.SAMA.TOTAL_VOLUME.processName },
                pagename: { [Op.eq]: Constants.SAMA.TOTAL_VOLUME.pageName },
                stagename: { [Op.eq]: Constants.SAMA.TOTAL_VOLUME.stageName }
            },
            order: [
                ['startdatetime', Constants.SORT.DESC]
            ]
        }
    ).then(_status => {
        callback(null, _status);
    });
}