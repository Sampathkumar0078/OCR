/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACaseLock', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAWorkQueueItem',
        key: 'ident'
      }
    },
    locktime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPASession',
        key: 'sessionid'
      }
    },
    lockid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    tableName: 'BPACaseLock',
    timestamps: false
  });
};
