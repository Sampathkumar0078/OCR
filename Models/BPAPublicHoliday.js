/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPublicHoliday', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dd: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dayofweek: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nthofmonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    relativetoholiday: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAPublicHoliday',
        key: 'id'
      }
    },
    relativedaydiff: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eastersunday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'BPAPublicHoliday',
    timestamps: false
  });
};
