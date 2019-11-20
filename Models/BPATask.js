/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPATask', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPASchedule',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    onsuccess: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPATask',
        key: 'id'
      }
    },
    onfailure: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPATask',
        key: 'id'
      }
    },
    failfastonerror: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'BPATask',
    timestamps: false
  });
};
