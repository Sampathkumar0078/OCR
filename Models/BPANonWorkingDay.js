/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPANonWorkingDay', {
    calendarid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPACalendar',
        key: 'id'
      }
    },
    nonworkingday: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'BPANonWorkingDay',
    timestamps: false
  });
};
