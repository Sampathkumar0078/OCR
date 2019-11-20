/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleLog', {
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
    instancetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    firereason: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    heartbeat: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BPAScheduleLog',
    timestamps: false
  });
};
