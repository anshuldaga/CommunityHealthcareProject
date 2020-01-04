const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = require('../mysqlConnection');

exports.getMedlog = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM medlog where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.putMedlog = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @startTime=?; SET @endTime=?;\
      SET @isMed1=?;SET @isMed2=?;SET @isMed3=?;\
      CALL MedlogAddOrEdit(@id, @userId, @startTime, @endTime, @isMed1, @isMed2, @isMed3);';
  mysqlConnection.query(
    sql,
    [
      info.id,
      payload.id,
      info.startTime,
      info.endTime,
      info.isMed1,
      info.isMed2,
      info.isMed3
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

exports.deleteMedlog = (req, res, next) => {
  mysqlConnection.query(
    'DELETE FROM medlog where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
