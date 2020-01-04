const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getMednames = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM mednames where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.putMednames = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @med1name=?; SET @med2name=?; SET @med3name=?;\
      SET @med1notes=?;SET @med2notes=?;SET @med3notes=?;\
      CALL MednamesAddOrEdit(@id, @userId, @med1name, @med2name, @med1name, @med1notes, @med2notes, @med3notes);';
  mysqlConnection.query(
    sql,
    [
      info.id,
      payload.id,
      info.med1name,
      info.med2name,
      info.med3name,
      info.med1notes,
      info.med2notes,
      info.med3notes
    ],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};
