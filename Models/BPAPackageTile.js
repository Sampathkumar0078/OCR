/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackageTile', {
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    tileid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPATile',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAPackageTile',
    timestamps: false
  });
};
