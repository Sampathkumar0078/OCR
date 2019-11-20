/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPMIUtilisationMonthly', {
    reportyear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reportmonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resourceid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    hr0: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr5: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr6: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr7: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr8: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr9: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr10: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr11: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr12: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr13: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr14: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr15: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr16: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr17: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr18: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr19: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr20: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr21: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr22: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hr23: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BPMIUtilisationMonthly',
    timestamps: false
  });
};
