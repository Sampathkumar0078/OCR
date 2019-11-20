/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessElementDependency', {
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
    refElementID: {
      type: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessElementDependency',
    timestamps: false
  });
};
