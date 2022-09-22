const mysql = require('mysql');

// create here mysql connection

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cmsDb',
    dateStrings: true,
    multipleStatements: true
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully..!!!');
})

module.exports = dbConn;