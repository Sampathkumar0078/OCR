/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWorkQueueLog', {
    logid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    queueident: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    queueop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemid: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    keyvalue: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAWorkQueueLog',
    timestamps: false
  });
};
