const mysql = require('mysql');
const config = require('config')
const app = require('./app');

const pool = mysql.createPool({
  host: config.get('db.host'),
  port: config.get('db.port'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
});

pool.getConnection((err) => {
  if (!err) console.log('DB connection successful!');
})

exports.getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connnection) => {
      if (!err) resolve(connnection);
      else reject(err);
    })
  })
}

exports.releaseConnection = (connection) => {
  connection.release();
}

exports.query = (connection, query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (!err) resolve(result);
      else reject(err);
    })
  })
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Service is running on port ${port}...`);
});

