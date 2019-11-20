/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATreePerm', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    treeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPATree',
        key: 'id'
      }
    },
    permid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAPerm',
        key: 'id'
      }
    },
    groupLevelPerm: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'BPATreePerm',
    timestamps: false
  });
};
