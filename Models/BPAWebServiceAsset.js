/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWebServiceAsset', {
    serviceid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAWebService',
        key: 'serviceid'
      }
    },
    assettype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assetxml: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'BPAWebServiceAsset',
    timestamps: false
  });
};
