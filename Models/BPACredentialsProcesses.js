/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACredentialsProcesses', {
    credentialid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPACredentials',
        key: 'id'
      }
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    }
  }, {
    tableName: 'BPACredentialsProcesses',
    timestamps: false
  });
};
