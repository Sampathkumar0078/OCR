/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAGroupGroup', {
    groupid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAGroup',
        key: 'id'
      }
    },
    memberid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAGroup',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAGroupGroup',
    timestamps: false
  });
};
