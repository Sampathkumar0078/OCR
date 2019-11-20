/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPALicense', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    licensekey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    installedon: {
      type: DataTypes.DATE,
      allowNull: false
    },
    installedby: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    }
  }, {
    tableName: 'BPALicense',
    timestamps: false
  });
};
