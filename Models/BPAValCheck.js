/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAValCheck', {
    checkid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    catid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAValCategory',
        key: 'catid'
      }
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAValType',
        key: 'typeid'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'BPAValCheck',
    timestamps: false
  });
};
