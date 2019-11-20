/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleAlert', {
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
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
    tableName: 'BPAScheduleAlert',
    timestamps: false
  });
};
