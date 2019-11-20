/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessActionDependency', {
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
    refProcessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refActionName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessActionDependency',
    timestamps: false
  });
};
