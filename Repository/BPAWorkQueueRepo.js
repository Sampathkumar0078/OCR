var BPAWorkQueue = require('../Models').BPAWorkQueue;
const Constants = require('../Config/Constants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const _ = require('lodash');

module.exports.get = function (conditions, _attributes, callback) {
    BPAWorkQueue.find(
        {
            where: conditions,
            attributes: ['id']
        }
    ).then(_data => {
        callback(Constants.NULL, _data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}

module.exports.getAll = function (conditions, callback) {
    BPAWorkQueue.findAll(conditions
    ).then(_data => {
        callback(Constants.NULL, _data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}

module.exports.getQueues = function (req, callback) {
    BPAWorkQueue.findAll({ attributes: ['id', 'name', 'running'] })
        .then(_queues => {
            callback(Constants.NULL, _queues);
        }).catch(err => {
            callback(err, Constants.NULL);
        });
}

module.exports.updateQueue = function (conditions, updateFields, callback) {
    BPAWorkQueue.update(
        updateFields,
        { where: conditions }
    ).then(_updated => {
        callback(null, _updated);
    }).catch(err => {
        callback(err, null);
    });
}