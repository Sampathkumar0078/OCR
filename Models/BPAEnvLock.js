/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAEnvLock', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPASession',
        key: 'sessionid'
      }
    },
    locktime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAEnvLock',
    timestamps: false
  });
};
