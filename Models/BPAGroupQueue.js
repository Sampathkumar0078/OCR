/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAGroupQueue', {
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
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAWorkQueue',
        key: 'ident'
      }
    }
  }, {
    tableName: 'BPAGroupQueue',
    timestamps: false
  });
};
