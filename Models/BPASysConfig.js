/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPASysConfig', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maxnumconcproc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    populateusernameusing: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    autosaveinterval: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EnforceEditSummaries: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '1'
    },
    ArchiveInProgress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PassWordExpiryWarningInterval: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ActiveDirectoryProvider: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    CompressProcessXML: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    showusernamesonlogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    maxloginattempts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ArchivingMode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    ArchivingLastAuto: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ArchivingFolder: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    ArchivingAge: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '6m'
    },
    ArchivingDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    ArchivingResource: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAResource',
        key: 'resourceid'
      }
    },
    DependencyState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((2))'
    },
    unicodeLogging: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    defaultencryptid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAKeyStore',
        key: 'id'
      }
    },
    ResourceRegistrationMode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    PreventResourceRegistration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    RequireSecuredResourceConnections: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    }
  }, {
    tableName: 'BPASysConfig',
    timestamps: false
  });
};
