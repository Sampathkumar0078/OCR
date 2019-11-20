/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPADashboard', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dashtype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    }
  }, {
    tableName: 'BPADashboard',
    timestamps: false
  });
};
