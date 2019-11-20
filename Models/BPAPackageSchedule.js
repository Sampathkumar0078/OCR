/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackageSchedule', {
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    scheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPASchedule',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAPackageSchedule',
    timestamps: false
  });
};
