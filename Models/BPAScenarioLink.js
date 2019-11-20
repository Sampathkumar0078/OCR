/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScenarioLink', {
    scenarioid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    scenarioname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: true
    }
  }, {
    tableName: 'BPAScenarioLink',
    timestamps: false
  });
};
