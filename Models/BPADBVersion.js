/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPADBVersion', {
    dbversion: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    scriptrundate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scriptname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timezoneoffset: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BPADBVersion',
    timestamps: false
  });
};
