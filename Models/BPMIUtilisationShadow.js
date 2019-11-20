/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPMIUtilisationShadow', {
    sessionid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    resourceid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    processid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    startdatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    enddatetime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BPMIUtilisationShadow',
    timestamps: false
  });
};
