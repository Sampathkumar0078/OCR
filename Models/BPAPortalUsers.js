/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const bpaPortalUsers = sequelize.define('BPAPortalUsers', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPAPortalUserRoles',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '(getdate())'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '(getdate())'
    }
  }, {
      tableName: 'BPAPortalUsers',
      timestamps: false
    });

  bpaPortalUsers.associate = function (models) {
    bpaPortalUsers.belongsTo(models.BPAPortalUserRoles, {
      foreignKey: 'role',
    });
  };

  return bpaPortalUsers;
};
