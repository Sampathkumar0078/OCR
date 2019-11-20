/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAInternalAuth', {
    UserID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    Token: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    Expiry: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Roles: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    LoggedInMode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((0))'
    },
    ProcessId: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    IsWebService: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'BPAInternalAuth',
    timestamps: false
  });
};
