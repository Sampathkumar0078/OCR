/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAScenarioDetail', {
    scenarioid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAScenario',
        key: 'testnum'
      }
    },
    testnum: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAScenario',
        key: 'testnum'
      }
    },
    detailid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    testtext: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAScenarioDetail',
    timestamps: false
  });
};
