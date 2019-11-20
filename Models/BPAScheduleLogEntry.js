/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleLogEntry', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    schedulelogid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAScheduleLog',
        key: 'id'
      }
    },
    entrytype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entrytime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    taskid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPATask',
        key: 'id'
      }
    },
    logsessionnumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPASession',
        key: 'sessionnumber'
      }
    },
    terminationreason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stacktrace: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAScheduleLogEntry',
    timestamps: false
  });
};
