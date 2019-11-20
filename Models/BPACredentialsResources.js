/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACredentialsResources', {
    credentialid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPACredentials',
        key: 'id'
      }
    },
    resourceid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAResource',
        key: 'resourceid'
      }
    }
  }, {
    tableName: 'BPACredentialsResources',
    timestamps: false
  });
};
