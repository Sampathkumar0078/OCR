/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackageProcess', {
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    }
  }, {
    tableName: 'BPAPackageProcess',
    timestamps: false
  });
};
