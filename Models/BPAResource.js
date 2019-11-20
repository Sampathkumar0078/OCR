/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAResource', {
    resourceid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    processesrunning: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    actionsrunning: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unitsallocated: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastupdated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AttributeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    pool: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    controller: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    diagnostics: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))'
    },
    logtoeventlog: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    FQDN: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ssl: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    // userID: {
    //   type: DataTypes.UUIDV4,
    //   allowNull: true
    // },
    // DisplayStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  }, {
    tableName: 'BPAResource',
    timestamps: false
  });
};
