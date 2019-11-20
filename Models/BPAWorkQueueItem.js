/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const bpaWorkQueueItem = sequelize.define('BPAWorkQueueItem', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    queueid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    keyvalue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    attempt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((0))'
    },
    loaded: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    exception: {
      type: DataTypes.DATE,
      allowNull: true
    },
    exceptionreason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deferred: {
      type: DataTypes.DATE,
      allowNull: true
    },
    worktime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((0))'
    },
    data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    queueident: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      references: {
        model: 'BPAWorkQueue',
        key: 'ident'
      }
    },
    ident: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    prevworktime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    attemptworktime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    finished: {
      type: DataTypes.DATE,
      allowNull: true
    },
    exceptionreasonvarchar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    exceptionreasontag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    encryptid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAKeyStore',
        key: 'id'
      }
    },
    lastupdated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
      tableName: 'BPAWorkQueueItem'
    });

  bpaWorkQueueItem.associate = function(models) {
    bpaWorkQueueItem.belongsTo(models.BPAWorkQueue, {
      foreignKey: 'queueident'
    });
  };

  return bpaWorkQueueItem;
};
