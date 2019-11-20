/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcess', {
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    ProcessType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdby: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    lastmodifieddate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmodifiedby: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    AttributeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    compressedxml: {
      type: "IMAGE",
      allowNull: true
    },
    processxml: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wspublishname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    runmode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    sharedObject: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    forceLiteralForm: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    useLegacyNamespace: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'BPAProcess',
    timestamps: false
  });
};
