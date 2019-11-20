/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessQueueDependency', {
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
    refQueueName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessQueueDependency',
    timestamps: false
  });
};
