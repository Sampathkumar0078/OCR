/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACredentialsProperties', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    credentialid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPACredentials',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPACredentialsProperties',
    timestamps: false
  });
};
