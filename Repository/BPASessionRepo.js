var BPASession = require('../Models').BPASession;
var BPAResource = require('../Models').BPAResource;
var BPAStatus = require('../Models').BPAStatus;
const Sequelize = require('sequelize');
const Constants = require('../Config/Constants');
const Op = Sequelize.Op

BPASession.belongsTo(BPAResource);


module.exports.gethangedvms = function (req, callback) {
    BPASession.findAll(
        {
            where: { statusid: { [Op.eq]: Constants.PROCESS_STATUS.DEBUGGING } },
            attributes: ['runningresourceid'],
            //    include: [{
            //        'model': BPAResource,
            //        attributes: ['name'],
            //    }]
            // include: [{
            //     'model': BPAStatus,
            //     attributes: ['statusid'],
            // }]
        }
    ).then(data => {
        callback(null, data);
        // console.log(data);
        // console.log(JSON.stringify(data));
    });

    // Sequelize.query("select name, runningresourceid from [dbo].[BPAResource] as r left outer join [dbo].[BPASession] as s on s.runningresourceid = r.resourceid;")
    // .then(data =>{
    //     callback(null, data)
    // });
}

module.exports.delete = function (conditions, callback) {
    BPASession.destroy(
        {
            where: { conditions }
        }
    ).then(data => {
        callback(null, data);
    }).catch(err => {
        callback(err, Constants.NULL);
    });;
}

