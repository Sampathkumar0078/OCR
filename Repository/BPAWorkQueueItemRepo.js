var BPAWorkQueue = require('../Models').BPAWorkQueue;
var BPAWorkQueueItem = require('../Models').BPAWorkQueueItem;
var BPAWorkQueueItemTag = require('../Models').BPAWorkQueueItemTag;
const Constants = require('../Config/Constants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const _ = require('lodash');
const addSubtractDate = require("add-subtract-date");


/* Get Queue details with respective to tags*/
module.exports.getQueueDetails = function (req, callback) {
    BPAWorkQueue.find(
        { where: { name: { [Op.like]: '%' + req.params.queueName + '%' } }, attributes: ['id'] }
    ).then(_data => {
        BPAWorkQueueItemTag.findAll({ where: { tagid: 1 }, attributes: ['queueitemident'] }).then(_tagIds => { //chnage tagid for respective tags.
            // BPAWorkQueueItem.findAll(
            //     {
            //         where: sequelize.fn('date', sequelize.col('createdAt')), '=', '2018-11-07'{
            //             queueid: { [Op.eq]: queueIds[0].id },
            //             loaded: { [Op.gte]: n}
            //         }, attributes: ['id']
            //     }).then(wqItems => {
            //         callback(null, wqItems);
            //     });
            var identIds = [];
            _.forEach(_tagIds, function (item) {
                identIds.push(item.queueitemident);
            })
            if (_tagIds) {
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
                BPAWorkQueueItem.findAll({
                    // where: Sequelize.where(Sequelize.fn('date', Sequelize.col('loaded')), '=', '2019-03-03')
                    where: {
                        queueid: { [Op.eq]: _data.id },
                        loaded: {
                            [Op.between]: [currentDate + Constants.START_TIME_OF_DAY, nextDate + ' ' + Constants.START_TIME_OF_DAY]
                            // [Op.gt]: '2019-03-03 00:00:00'
                        },
                        ident: { [Op.in]: identIds }
                    }, attributes: ['id', 'keyvalue', 'loaded', 'exceptionreason', 'exception']

                }).then(wqItems => {
                    callback(Constants.NULL, wqItems);
                }).catch(err => {
                    callback(err, Constants.NULL);
                });
            } else {
                callback('No tags found', Constants.NULL);
            }
        });
    });
}

module.exports.getAll = function (conditions, _attributes, callback) {
    BPAWorkQueueItem.findAll(
        { where: conditions, attributes: _attributes }
    ).then(data => {
        callback(Constants.NULL, data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}

module.exports.getSamaEsr = function (conditions, callback) {
    BPAWorkQueueItem.findAll(conditions
    ).then(data => {
        callback(Constants.NULL, data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}

