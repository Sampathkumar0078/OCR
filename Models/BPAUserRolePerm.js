/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAUserRolePerm', {
    userroleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUserRole',
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
    tableName: 'BPAUserRolePerm',
    timestamps: false
  });
};
