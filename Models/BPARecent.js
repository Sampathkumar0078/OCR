/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPARecent', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    datelastopened: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPARecent',
    timestamps: false
  });
};
