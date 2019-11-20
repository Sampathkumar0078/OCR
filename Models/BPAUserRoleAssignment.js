/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAUserRoleAssignment', {
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    userroleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUserRole',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAUserRoleAssignment',
    timestamps: false
  });
};
