'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const AppConfig = require('../config/AppConfig');
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Op = Sequelize.Op;

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
     sequelize = new Sequelize(AppConfig.database.name, AppConfig.database.username, AppConfig.database.password, {
        host: AppConfig.database.host,
        dialect: AppConfig.database.dialect,
        operatorsAliases: false,
        pool: AppConfig.database.pollConfig,
        additional: {
            timestamps: false
        },
        operatorsAliases: {
          $eq: Op.eq,
          $ne: Op.ne,
          $gte: Op.gte,
          $gt: Op.gt,
          $lte: Op.lte,
          $lt: Op.lt,
          $not: Op.not,
          $in: Op.in,
          $notIn: Op.notIn,
          $is: Op.is,
          $like: Op.like,
          $notLike: Op.notLike,
          $iLike: Op.iLike,
          $notILike: Op.notILike,
          $regexp: Op.regexp,
          $notRegexp: Op.notRegexp,
          $iRegexp: Op.iRegexp,
          $notIRegexp: Op.notIRegexp,
          $between: Op.between,
          $notBetween: Op.notBetween,
          $overlap: Op.overlap,
          $contains: Op.contains,
          $contained: Op.contained,
          $adjacent: Op.adjacent,
          $strictLeft: Op.strictLeft,
          $strictRight: Op.strictRight,
          $noExtendRight: Op.noExtendRight,
          $noExtendLeft: Op.noExtendLeft,
          $and: Op.and,
          $or: Op.or,
          $any: Op.any,
          $all: Op.all,
          $values: Op.values,
          $col: Op.col
        }
      });
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;