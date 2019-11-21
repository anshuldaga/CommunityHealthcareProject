const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oliverkahn',
  database: 'healthcareapp',
  multipleStatements: true
});

exports.createUser = (req, res, next) => {
    let user = req.body;
    var checkUsernameSql = 'SELECT COUNT(*) AS count FROM usercredentials WHERE username = ?;';
    mysqlConnection.query(checkUsernameSql, [user.username], (err, rows) => {
      if(err){
        res.status(400).send("Error occurred");
      }
      else{
        if(rows[0].count > 0){
          return res.status(400).send("User already registered.");
        }
        else{
          var sql = 'INSERT INTO usercredentials(firstName, lastName, address, username, password, lastUpdatedDT) VALUES (?, ?, ?, ?, ?, now());';
          mysqlConnection.query(sql, [user.firstName, user.lastName, user.address, user.username, user.password], (err, rows, fields)=>{
              if(!err){
                let id = res.insertId;
                let token = jwt.sign({ id }, 'jk23!+!97', { expiresIn: '1h' });
                res.status(200).send({ token });
              }
              else{
                return res.status(500).send("There was a problem registering the user");
              }
            });
          }
        }
    });
}

exports.loginUser = (req, res) => {
  let user = req.body;
  var sql = 'SELECT * FROM usercredentials WHERE username = ? AND password = ?;';
  mysqlConnection.query(sql, [user.username, user.password], function(err, rows) {
    if (err) {
      res.status(400).send("Error occurred");
    } 
    else {
      if(rows.length > 0){
        if(rows[0].password == user.password){
          const id = rows[0].id;
          let token = jwt.sign({ id }, 'jk23!+!97', { expiresIn: '1h' });
          res.status(200).send({ token });
        }
      }
      else{
        res.status(400).send("Username and/or password doesn't match");
      }
    }
  });
};

exports.addEvent = (req, res, next) => {
  //res.send('akshat3');
  let event = req.body;
  var sql =
    'INSERT INTO appointment(userId, title, description, startTime, endTime, location, isMedication) VALUES(?, ?, ?, ?, ?, ?, ?);';
  mysqlConnection.query(
    sql,
    [
      event.userId,
      event.title,
      event.description,
      event.startTime,
      event.endTime,
      event.location,
      event.isMedication
    ],
    (err, rows, fields) => {
      if (!err) console.log('Event inserted succesfully');
      else console.log(err);
    }
  );
};

exports.getUserHealth = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM userhealth where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else console.log(err);
    }
  );
};
