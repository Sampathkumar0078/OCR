/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPackage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BPAPackage',
    timestamps: false
  });
};
