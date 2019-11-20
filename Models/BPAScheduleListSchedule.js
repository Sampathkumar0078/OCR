/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleListSchedule', {
    schedulelistid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAScheduleList',
        key: 'id'
      }
    },
    scheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPASchedule',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAScheduleListSchedule',
    timestamps: false
  });
};
