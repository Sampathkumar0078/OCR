/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPATag',
    timestamps: false
  });
};
