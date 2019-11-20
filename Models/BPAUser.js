/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAUser', {
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    validfromdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    validtodate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    passwordexpirydate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    useremail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    UseEditSummaries: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '1'
    },
    preferredStatisticsInterval: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SaveToolStripPositions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    PasswordDurationWeeks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AlertEventTypes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    AlertNotificationTypes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    LogViewerHiddenColumns: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    systemusername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    loginattempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    lastsignedin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BPAUser',
    timestamps: false
  });
};
