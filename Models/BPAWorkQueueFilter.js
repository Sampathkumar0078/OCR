/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWorkQueueFilter', {
    FilterID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    FilterName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FilterXML: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAWorkQueueFilter',
    timestamps: false
  });
};
