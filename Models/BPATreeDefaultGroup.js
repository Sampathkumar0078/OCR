/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATreeDefaultGroup', {
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
    groupid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAGroup',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPATreeDefaultGroup',
    timestamps: false
  });
};
