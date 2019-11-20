/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPortalUserRoles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAPortalUserRoles'
  });
};
