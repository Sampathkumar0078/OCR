/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPASession', {
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    sessionnumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startdatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    enddatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    starterresourceid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAResource',
        key: 'resourceid'
      }
    },
    starteruserid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    runningresourceid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAResource',
        key: 'resourceid'
      }
    },
    runningosusername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAStatus',
        key: 'statusid'
      }
    },
    startparamsxml: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logginglevelsxml: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sessionstatexml: {
      type: DataTypes.STRING,
      allowNull: true
    },
    queueid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAWorkQueue',
        key: 'ident'
      }
    },
    stoprequested: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stoprequestack: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastupdated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    laststage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warningthreshold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    starttimezoneoffset: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    endtimezoneoffset: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastupdatedtimezoneoffset: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BPASession'
  });
};
