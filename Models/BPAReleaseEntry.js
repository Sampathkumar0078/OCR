/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAReleaseEntry', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    releaseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPARelease',
        key: 'id'
      }
    },
    typekey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entityid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAReleaseEntry',
    timestamps: false
  });
};
