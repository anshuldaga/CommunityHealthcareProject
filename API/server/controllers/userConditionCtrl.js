const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'healthcareapp',
  multipleStatements: true
});

exports.getUserCondition = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  mysqlConnection.query(
    'SELECT * FROM usercondition where userId = ?',
    payload.id,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.deleteUserCondition = (req, res, next) => {
  mysqlConnection.query(
    'DELETE FROM usercondition where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.putUserCondition = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @condition_name=?; SET @condition_notes=?;\
      CALL UserconditionAddOrEdit(@id, @userId, @condition_name, @condition_notes);';
  mysqlConnection.query(
    sql,
    [info.id, payload.id, info.condition_name, info.condition_notes],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};
