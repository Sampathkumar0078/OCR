/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScreenshot', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resourceid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    stageid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    processname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastupdated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timezoneoffset: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    screenshot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    encryptid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAKeyStore',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAScreenshot',
    timestamps: false
  });
};
