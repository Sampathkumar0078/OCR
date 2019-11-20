/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAGroupTile', {
    groupid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAGroup',
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
    tableName: 'BPAGroupTile',
    timestamps: false
  });
};
