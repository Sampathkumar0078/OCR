/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWorkQueue', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keyfield: {
      type: DataTypes.STRING,
      allowNull: true
    },
    running: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    maxattempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    DefaultFilterID: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAWorkQueueFilter',
        key: 'FilterID'
      }
    },
    ident: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    resourcegroupid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAGroup',
        key: 'id'
      }
    },
    targetsessions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    activelock: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    activelocktime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activelockname: {
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
    }
  }, {
    tableName: 'BPAWorkQueue',
    timestamps: false
  });
};
