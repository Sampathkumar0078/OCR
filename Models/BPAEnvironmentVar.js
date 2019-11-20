/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAEnvironmentVar', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    datatype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAEnvironmentVar',
    timestamps: false
  });
};
