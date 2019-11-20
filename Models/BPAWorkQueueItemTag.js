/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAWorkQueueItemTag', {
    queueitemident: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAWorkQueueItem',
        key: 'ident'
      }
    },
    tagid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPATag',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAWorkQueueItemTag',
    timestamps: false
  });
};
