/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATileDataSources', {
    spname: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    tiletype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    helppage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPATileDataSources',
    timestamps: false
  });
};
