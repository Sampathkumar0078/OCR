/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAIntegerPref', {
    prefid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAPref',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'BPAIntegerPref',
    timestamps: false
  });
};
