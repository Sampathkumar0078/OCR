/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAGroup', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    treeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPATree',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isrestricted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'BPAGroup',
    timestamps: false
  });
};
