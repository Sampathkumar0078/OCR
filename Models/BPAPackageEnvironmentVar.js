/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackageEnvironmentVar', {
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAEnvironmentVar',
        key: 'name'
      }
    }
  }, {
    tableName: 'BPAPackageEnvironmentVar',
    timestamps: false
  });
};
