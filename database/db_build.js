const fs = require('fs');

const dbConnection = require('./db_connection.js');

let sql;

  if ((process.env.NODE_ENV = "test")) {
    sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
  } else {
    sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
  }

const runDbBuild = cb => {
  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = runDbBuild;
