var BPACaseLock = require('../Models').BPACaseLock;
const Constants = require('../Config/Constants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const _ = require('lodash');

module.exports.getAll = function (conditions, _attributes, callback) {
    BPACaseLock.findAll(
        {
            where: conditions,
        attributes: _attributes}
    ).then(caseLocks => {
        callback(Constants.NULL, caseLocks);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}


