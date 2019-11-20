/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessWebServiceDependency', {
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
    refServiceName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BPAProcessWebServiceDependency',
    timestamps: false
  });
};
