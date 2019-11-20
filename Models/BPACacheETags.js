/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPACacheETags', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    tag: {
      type: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    tableName: 'BPACacheETags',
    timestamps: false
  });
};
