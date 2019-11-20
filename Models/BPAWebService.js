/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWebService', {
    serviceid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    servicename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wsdl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    settingsXML: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timeout: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((10000))'
    }
  }, {
    tableName: 'BPAWebService',
    timestamps: false
  });
};
