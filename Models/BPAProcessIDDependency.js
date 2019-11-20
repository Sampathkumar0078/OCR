/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessIDDependency', {
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
    refProcessID: {
      type: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessIDDependency',
    timestamps: false
  });
};
