/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPermGroupMember', {
    permgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPermGroup',
        key: 'id'
      }
    },
    permid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPerm',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAPermGroupMember',
    timestamps: false
  });
};
