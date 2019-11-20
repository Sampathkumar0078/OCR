var BPAResource = require('../Models').BPAResource;
const Constants = require('../Config/Constants');

module.exports.getResourceNames = function (resourceIds, callback) {
    BPAResource.findAll(
        {
            where: { resourceid: resourceIds },
            attributes: ['name'],

        }
    ).then(data => {
        callback(null, data);
    });
}

module.exports.getAll = function (conditions, callback) {
    BPAResource.findAll(
        conditions
    ).then(data => {
        callback(Constants.NULL, data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });
}