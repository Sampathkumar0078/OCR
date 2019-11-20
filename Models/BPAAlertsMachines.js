/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAAlertsMachines', {
    MachineName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'BPAAlertsMachines',
    timestamps: false
  });
};
