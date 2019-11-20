/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleTrigger', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPASchedule',
        key: 'id'
      }
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unittype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startpoint: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    endpoint: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dayset: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    calendarid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPACalendar',
        key: 'id'
      }
    },
    nthofmonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    missingdatepolicy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usertrigger: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'BPAScheduleTrigger',
    timestamps: false
  });
};
