/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPMIProductivityMonthly', {
    reportyear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reportmonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    queueident: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deferred: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    retried: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exceptioned: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    completed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minworktime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avgworktime: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    maxworktime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minelapsedtime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avgelapsedtime: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    maxelapsedtime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minretries: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avgretries: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    maxretries: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BPMIProductivityMonthly',
    timestamps: false
  });
};
