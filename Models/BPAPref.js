/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAPref', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    }
  }, {
    tableName: 'BPAPref',
    timestamps: false
  });
};
