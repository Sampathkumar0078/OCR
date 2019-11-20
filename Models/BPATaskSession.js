/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATaskSession', {
    taskid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPATask',
        key: 'id'
      }
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    failonerror: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    processparams: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resourcename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPATaskSession',
    timestamps: false
  });
};
