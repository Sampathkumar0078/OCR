/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessAlert', {
    UserID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    ProcessID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    }
  }, {
    tableName: 'BPAProcessAlert',
    timestamps: false
  });
};
