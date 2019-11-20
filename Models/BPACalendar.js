/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACalendar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publicholidaygroupid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAPublicHolidayGroup',
        key: 'id'
      }
    },
    workingweek: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'BPACalendar',
    timestamps: false
  });
};
