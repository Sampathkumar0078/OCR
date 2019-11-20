/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScenario', {
    scenarioid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    testnum: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    passed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    scenariotext: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scenarionotes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAScenario',
    timestamps: false
  });
};
