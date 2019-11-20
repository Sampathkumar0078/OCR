/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAValActionMap', {
    catid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAValCategory',
        key: 'catid'
      }
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAValType',
        key: 'typeid'
      }
    },
    actionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAValAction',
        key: 'actionid'
      }
    }
  }, {
    tableName: 'BPAValActionMap',
    timestamps: false
  });
};
