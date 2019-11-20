/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAStringPref', {
    prefid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAPref',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAStringPref',
    timestamps: false
  });
};
