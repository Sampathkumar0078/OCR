/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAFont', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fontdata: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAFont',
    timestamps: false
  });
};
