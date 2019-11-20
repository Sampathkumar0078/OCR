/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPassword', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastuseddate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BPAPassword',
    timestamps: false
  });
};
