/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPublicHolidayGroupMember', {
    publicholidaygroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAPublicHolidayGroup',
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
    tableName: 'BPAPublicHolidayGroupMember',
    timestamps: false
  });
};
