var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'kmucsHI',
    database: 'cabinet',
    password: 'kmucs'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function (err, connection) {
 // Use the connection
        connection.query('SELECT * FROM student_infos', function (err, rows) {
            if (err) console.error("err : " + err);
         /*   console.log("rows : " + JSON.stringify(rows));*/
	   res.render('loginHI', {title: 'test', rows: rows});
  /*           res.render('login', {title: 'test', rows: rows}); */
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
});
    });
});


module.exports = router;
