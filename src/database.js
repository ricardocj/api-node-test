const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'database-1.cewnapspwztj.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: '656cf25ceb',
  database: 'Granero',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error('Tenemos un Error con la Base de datos: \n'+err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
