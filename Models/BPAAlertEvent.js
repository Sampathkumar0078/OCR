/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BPAAlertEvent', {
    AlertEventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AlertEventType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AlertNotificationType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ProcessID: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAProcess',
        key: 'processid'
      }
    },
    ResourceID: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPAResource',
        key: 'resourceid'
      }
    },
    SessionID: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'BPASession',
        key: 'sessionid'
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    SubscriberUserID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    SubscriberResourceID: {
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    SubscriberDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scheduleid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPASchedule',
        key: 'id'
      }
    },
    taskid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BPATask',
        key: 'id'
      }
    }
  }, {
    tableName: 'BPAAlertEvent',
    timestamps: false
  });
};
