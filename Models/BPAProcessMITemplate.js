/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessMITemplate', {
    templatename: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    defaulttemplate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    templatexml: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAProcessMITemplate',
    timestamps: false
  });
};
