/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScheduleList', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    listtype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    relativedate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    absolutedate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    daysdistance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    allschedules: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'BPAScheduleList',
    timestamps: false
  });
};
