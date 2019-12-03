const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'healthcareapp',
  multipleStatements: true
});

exports.getUserMedication = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM usermedication where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.deleteUserMedication = (req, res, next) => {
  mysqlConnection.query(
    'DELETE FROM usermedication where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.putUserMedication = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @medication_name=?; SET @medication_notes=?;\
  CALL UsermedicationAddOrEdit(@id, @userId, @medication_name, @medication_notes);';
  mysqlConnection.query(
    sql,
    [info.id, payload.id, info.medication_name, info.medication_notes],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};
