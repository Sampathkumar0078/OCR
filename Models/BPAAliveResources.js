/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAAliveResources', {
    MachineName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BPAAliveResources',
    timestamps: false
  });
};
