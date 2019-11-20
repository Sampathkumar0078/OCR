/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAGroupUserRolePerm', {
    groupid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAGroup',
        key: 'id'
      }
    },
    userroleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUserRolePerm',
        key: 'userroleid'
      }
    },
    permid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BPAUserRolePerm',
        key: 'userroleid'
      }
    }
  }, {
    tableName: 'BPAGroupUserRolePerm',
    timestamps: false
  });
};
