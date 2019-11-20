/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAReport', {
    reportid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reportdata: {
      type: "IMAGE",
      allowNull: true
    }
  }, {
    tableName: 'BPAReport',
    timestamps: false
  });
};
