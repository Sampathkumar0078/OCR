/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPublicHolidayWorkingDay', {
    calendarid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPACalendar',
        key: 'id'
      }
    },
    publicholidayid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPublicHoliday',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAPublicHolidayWorkingDay',
    timestamps: false
  });
};
