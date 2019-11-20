/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAMIControl', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((1))',
      primaryKey: true
    },
    mienabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    autorefresh: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    refreshat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastrefresh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refreshinprogress: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    dailyfor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((30))'
    },
    monthlyfor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '((6))'
    }
  }, {
    tableName: 'BPAMIControl',
    timestamps: false
  });
};
