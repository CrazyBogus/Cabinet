var express = require('express'); var mysql = require('mysql');
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
	
	var grade=1;
	var cabinets=[];
	connection.query('SELECT * FROM cabinet_infos  WHERE S_Grade = ? ' ,grade,function(err,rows) {
            if (err) throw err; 
	
		for(var i=0; i<rows.length; i++ )
		 {
			var cabinet = { 번호: rows[i].CabinetNo, 사용: rows[i].IsUse };
			cabinets.push(cabinet);
		}	

	res.render('apply1',{ cabinet_status : cabinets});
	connection.release();
	});
      });
});


module.exports = router;
