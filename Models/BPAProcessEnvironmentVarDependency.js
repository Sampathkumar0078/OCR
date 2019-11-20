/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessEnvironmentVarDependency', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    processID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    refVariableName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessEnvironmentVarDependency',
    timestamps: false
  });
};
