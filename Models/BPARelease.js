/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPARelease', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BPAPackage',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'BPAUser',
        key: 'userid'
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    compressedxml: {
      type: "IMAGE",
      allowNull: true
    },
    local: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'BPARelease',
    timestamps: false
  });
};
