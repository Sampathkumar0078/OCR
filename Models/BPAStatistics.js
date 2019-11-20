/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAStatistics', {
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    datatype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value_number: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    value_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    value_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'BPAStatistics',
    timestamps: false
  });
};
