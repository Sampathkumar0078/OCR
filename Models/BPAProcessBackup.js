/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAProcessBackup', {
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    UserID: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    backupdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    compressedxml: {
      type: "IMAGE",
      allowNull: true
    },
    processxml: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BPAProcessBackup',
    timestamps: false
  });
};
