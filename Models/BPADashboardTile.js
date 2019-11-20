/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPADashboardTile', {
    dashid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPADashboard',
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
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'BPADashboardTile',
    timestamps: false
  });
};
