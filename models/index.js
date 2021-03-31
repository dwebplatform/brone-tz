// const dbConfig = require("../config/db.config");
const filepaths = require('filepaths');
const Sequelize = require("sequelize");
const dbConfig = {
  DB: 'data_brone_tz',
  USER: 'root',
  PASSWORD: '',
}
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
let routes = filepaths.getSync('./models');
for (let path of routes) {// перебор по роутам, чтобы не нужно было писать require('./testModel.model.js")(sequelize,Sequelize);
  let [main, sub] = path.split('\\');
  if (sub === 'index.js') {
    continue;
  } else {
    let [name, model, ext] = sub.split('.');
    db[`${name}s`] = require(`./${name}.${model}.${ext}`)(sequelize, Sequelize);
  }
}
module.exports = db;