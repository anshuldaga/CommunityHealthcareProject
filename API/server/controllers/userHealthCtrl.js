const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'healthcareapp',
  multipleStatements: true
});

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

exports.putUserHealth = (req, res, next) => {
  const header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];

  var payload = jwt.verify(token, 'jk23!+!97');
  let info = req.body;
  var sql =
    'SET @userId = ?; SET @height_feet=?; SET @height_inches=?; SET @weight=?; SET @bloodtype = ?; SET @primary_contact=?; SET @secondary_contact=?; SET @medical_insurance=?; SET @dental_insurance = ?; SET @birthday=?; SET @allergy_notes=?;\
      CALL UserhealthAddOrEdit(@userId, @height_feet, @height_inches, @weight, @bloodtype, @primary_contact, @secondary_contact, @medical_insurance, @dental_insurance, @birthday, @allergy_notes);';
  mysqlConnection.query(
    sql,
    [
      payload.id,
      info.height_feet,
      info.height_inches,
      info.weight,
      info.bloodtype,
      info.primary_contact,
      info.secondary_contact,
      info.medical_insurance,
      info.dental_insurance,
      info.birthday,
      info.allergy_notes
    ],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          passed: true
        });
      }
    }
  );
};
