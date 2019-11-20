/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPasswordRules', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((1))',
      primaryKey: true
    },
    uppercase: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lowercase: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    digits: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    special: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    brackets: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    additional: {
      type: DataTypes.STRING,
      allowNull: true
    },
    norepeats: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    norepeatsdays: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    numberofrepeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    numberofdays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    }
  }, {
    tableName: 'BPAPasswordRules',
    timestamps: false
  });
};
