'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const AppConfig = require('../config/AppConfig');
// const config = require(__dirname + '/../config/config.json')[env];
const db2 = {};

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
     sequelize = new Sequelize(AppConfig.database2.name, AppConfig.database2.username, AppConfig.database2.password, {
        host: AppConfig.database.host,
        dialect: AppConfig.database.dialect,
        operatorsAliases: false,
        pool: AppConfig.database.pollConfig,
        additional: {
            timestamps: false
        },
      });
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db2[model.name] = model;
  });

Object.keys(db2).forEach(modelName => {
  if (db2[modelName].associate) {
    db2[modelName].associate(db2);
  }
});

db2.sequelize = sequelize;
db2.Sequelize = Sequelize;

module.exports = db2;