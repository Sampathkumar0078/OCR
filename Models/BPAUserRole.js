/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAUserRole', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ssogroup: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAUserRole',
    timestamps: false
  });
};
