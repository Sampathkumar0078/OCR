/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPMIProductivityShadow', {
    ident: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventdatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    queueident: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    eventid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    worktime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    elapsedtime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attempt: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BPMIProductivityShadow',
    timestamps: false
  });
};
