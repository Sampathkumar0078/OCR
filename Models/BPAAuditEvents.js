/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAAuditEvents', {
    eventdatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    eventid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sNarrative: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gSrcUserID: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    gTgtUserID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    gTgtProcID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    gTgtResourceID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    EditSummary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oldXML: {
      type: DataTypes.STRING,
      allowNull: true
    },
    newXML: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAAuditEvents',
    timestamps: false
  });
};
