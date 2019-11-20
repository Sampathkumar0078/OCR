/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessAttribute', {
    AttributeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AttributeName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAProcessAttribute',
    timestamps: false
  });
};
