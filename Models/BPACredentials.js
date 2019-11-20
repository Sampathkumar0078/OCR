/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACredentials', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirydate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    invalid: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'BPACredentials',
    timestamps: false
  });
};
