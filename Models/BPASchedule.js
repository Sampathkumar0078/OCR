/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPASchedule', {
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
    initialtaskid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    retired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    versionno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deletedname: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPASchedule',
    timestamps: false
  });
};
