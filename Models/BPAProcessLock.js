/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessLock', {
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    lockdatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    machinename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAProcessLock',
    timestamps: false
  });
};
