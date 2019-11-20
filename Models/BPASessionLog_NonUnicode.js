/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPASessionLog_NonUnicode', {
    sessionnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPASession',
        key: 'sessionnumber'
      }
    },
    seqnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stageid: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    stagename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stagetype: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    processname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pagename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    objectname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    actionname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resulttype: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startdatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    enddatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attributexml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    automateworkingset: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '((0))'
    },
    targetappname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '(NULL)'
    },
    targetappworkingset: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '((0))'
    },
    // starttimezoneoffset: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // endtimezoneoffset: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // }
  }, {
    tableName: 'BPASessionLog_NonUnicode',
    timestamps: false
  });
};
