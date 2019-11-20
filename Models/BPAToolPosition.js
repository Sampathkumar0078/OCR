/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAToolPosition', {
    UserID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Position: {
      type: "NCHAR",
      allowNull: true
    },
    X: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Y: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Mode: {
      type: "NCHAR",
      allowNull: true
    },
    Visible: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'BPAToolPosition',
    timestamps: false
  });
};
