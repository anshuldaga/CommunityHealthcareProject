const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getLog = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM log where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.putLog = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @startTime=?; SET @endTime=?;\
    SET @allDay=?;SET @isInsulin=?;SET @isBP=?;SET @isBG=?;\
    SET @insulinValue=?;SET @BPValue=?;SET @BGValue=?;\
    CALL LogAddOrEdit(@id, @userId, @startTime, @endTime, @allDay,  @isInsulin, @isBP, @isBG, @insulinValue, @BPValue, @BGValue);';
  mysqlConnection.query(
    sql,
    [
      info.id,
      payload.id,
      info.startTime,
      info.endTime,
      info.allDay,
      info.isInsulin,
      info.isBP,
      info.isBG,
      info.insulinValue,
      info.BPValue,
      info.BGValue
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

exports.deleteLog = (req, res, next) => {
  mysqlConnection.query(
    'DELETE FROM log where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
