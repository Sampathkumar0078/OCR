/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPADataTracker', {
    dataname: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    versionno: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'BPADataTracker',
    timestamps: false
  });
};
