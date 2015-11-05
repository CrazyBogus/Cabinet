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
	var message='start';
	res.render('login',{ee: message});
	res.console("Received get request");
});



router.post('/',function(req,res,next){
	 pool.getConnection(function (err, connection) {

        var id=req.body.studentID;
        var name=req.body.pwd;

 // Use the connection
        connection.query('SELECT * FROM student_infos WHERE S_Id = ? AND S_Name = ?',[id,name],function(err,rows) {
            if (err) throw err; 
         /*   console.log("rows : " + JSON.stringify(rows));*/
         var message="";
	
          if(rows.length!= 0)
	    { 
            //message=rows[0].S_Name+" "+rows[0].S_Id+" "+rows[0].Money+" ";
            var money=rows[0].Money;

            if(money==0)
              message="학생회비를 미납하셨습니다.";
              
            else{
              res.redirect("/apply");
	      }
            }

          else
  	       // message="학번과 이름을 확인해주세요";
                  message="false";

            res.render('login', {title: 'test', ee:message});
            connection.release();


            // Don't use the connection here, it has been returned to the pool.
      });
    });
});


module.exports = router;
                        

