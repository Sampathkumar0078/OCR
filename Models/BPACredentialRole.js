/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACredentialRole', {
    credentialid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPACredentials',
        key: 'id'
      }
    },
    userroleid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAUserRole',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPACredentialRole',
    timestamps: false
  });
};
