/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATile', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tiletype: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    autorefresh: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    xmlproperties: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPATile',
    timestamps: false
  });
};
