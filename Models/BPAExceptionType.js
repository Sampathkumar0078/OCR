/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAExceptionType', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAExceptionType',
    timestamps: false
  });
};
