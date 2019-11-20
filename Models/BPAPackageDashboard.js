/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackageDashboard', {
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    dashid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPADashboard',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAPackageDashboard',
    timestamps: false
  });
};
