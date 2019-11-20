/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAResourceConfig', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    config: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAResourceConfig',
    timestamps: false
  });
};
