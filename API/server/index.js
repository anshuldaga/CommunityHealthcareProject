const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyparser.json());
app.use(cors());

const user = require('./routes/userRoute');//user -> router

app.use(user);//router


var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'healthcareapp',
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (!err) console.log('connected!');
  else console.log('Failed ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express running at 3000!'));

////////////Rachana backend code
//health-card information

app.get('/userhealth/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM userhealth where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.put('/userhealth/', function(req, res) {
  let info = req.body;
  var sql =
    'SET @userId = ?; SET @height_feet=?; SET @height_inches=?; SET @weight=?; SET @bloodtype = ?; SET @primary_contact=?; SET @secondary_contact=?; SET @medical_insurance=?; SET @dental_insurance = ?; SET @birthday=?; SET @allergy_notes=?;\
    CALL UserhealthAddOrEdit(@userId, @height_feet, @height_inches, @weight, @bloodtype, @primary_contact, @secondary_contact, @medical_insurance, @dental_insurance, @birthday, @allergy_notes);';
  mysqlConnection.query(
    sql,
    [
      info.userId,
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
});

//health-card condition
app.get('/usercondition/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM usercondition where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.delete('/usercondition/:id/', (req, res) => {
  mysqlConnection.query(
    'DELETE FROM usercondition where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.put('/usercondition/', function(req, res) {
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @condition_name=?; SET @condition_notes=?;\
    CALL UserconditionAddOrEdit(@id, @userId, @condition_name, @condition_notes);';
  mysqlConnection.query(
    sql,
    [info.id, info.userId, info.condition_name, info.condition_notes],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

//health-card medication
app.get('/usermedication/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM usermedication where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.delete('/usermedication/:id/', (req, res) => {
  mysqlConnection.query(
    'DELETE FROM usermedication where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.put('/usermedication/', function(req, res) {
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @medication_name=?; SET @medication_notes=?;\
    CALL UsermedicationAddOrEdit(@id, @userId, @medication_name, @medication_notes);';
  mysqlConnection.query(
    sql,
    [info.id, info.userId, info.medication_name, info.medication_notes],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

//health education page

//GET education tabs info
app.get('/educationtabs', (req, res) => {
  mysqlConnection.query(
    'SELECT educationtabs.tab_title, educationtabs.tab_description,  tabvideos.vidSection\
  FROM educationtabs \
      LEFT JOIN ( SELECT tab_id, JSON_ARRAYAGG(JSON_OBJECT("vid_title", vid_title, "vid_description", vid_description, "vid_link", vid_link)) vidSection FROM tabvideos GROUP BY tab_id\
      ) tabvideos ON tabvideos.tab_id = educationtabs.tab_id',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

///health-log page

//GET
app.get('/log/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM log where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//ADD or UPDATE
app.put('/log/', function(req, res) {
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
      info.userId,
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
});

//DELETE
app.delete('/log/:id/', (req, res) => {
  mysqlConnection.query(
    'DELETE FROM log where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//////////////////////////////////////medlog

//GET
app.get('/medlog/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM medlog where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//ADD or UPDATE
app.put('/medlog/', function(req, res) {
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @startTime=?; SET @endTime=?;\
      SET @isMed1=?;SET @isMed2=?;SET @isMed3=?;\
      CALL MedlogAddOrEdit(@id, @userId, @startTime, @endTime, @isMed1, @isMed2, @isMed3);';
  mysqlConnection.query(
    sql,
    [
      info.id,
      info.userId,
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
});

//DELETE
app.delete('/medlog/:id/', (req, res) => {
  mysqlConnection.query(
    'DELETE FROM medlog where id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//// mednames
app.get('/mednames/:userId/', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM mednames where userId = ?',
    [req.params.userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//ADD or UPDATE
app.put('/mednames/', function(req, res) {
  let info = req.body;
  var sql =
    'SET @id = ?; SET @userId = ?; SET @med1name=?; SET @med2name=?; SET @med3name=?;\
      SET @med1notes=?;SET @med2notes=?;SET @med3notes=?;\
      CALL MednamesAddOrEdit(@id, @userId, @med1name, @med2name, @med1name, @med1notes, @med2notes, @med3notes);';
  mysqlConnection.query(
    sql,
    [
      info.id,
      info.userId,
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
});
//Check to make sure header is not undefined, if so, return Forbidden (403)
// const checkToken = (req, res, next) => {
//     const header = req.headers['authorization'];

//     if(typeof header !== 'undefined') {
//         const bearer = header.split(' ');
//         const token = bearer[1];

//         req.token = token;
//         next();
//     } else {
//         //If header is undefined return Forbidden (403)
//         res.sendStatus(403)
//     }
// }

// app.get('/userhealth/:userId/', checkToken, (req, res) => {
//     console.log('akshat')
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         mysqlConnection.query('SELECT * FROM userhealth where userId = ?', [req.params.userId], (err, rows, fields)=>{
//             if(!err){
//                 res.send(rows);
//             }
//             else
//                 console.log(err);
//         })
//     })
// });

// app.put('/userhealth/', function(req, res){
//     let info = req.body;
//     var sql = "SET @userId = ?; SET @height_feet=?; SET @height_inches=?; SET @weight=?; SET @bloodtype = ?; SET @primary_contact=?; SET @secondary_contact=?; SET @medical_insurance=?; SET @dental_insurance = ?; SET @birthday=?; SET @allergy_notes=?;\
//     CALL UserhealthAddOrEdit(@userId, @height_feet, @height_inches, @weight, @bloodtype, @primary_contact, @secondary_contact, @medical_insurance, @dental_insurance, @birthday, @allergy_notes);";
//     mysqlConnection.query(sql, [info.userId, info.height_feet, info.height_inches, info.weight, info.bloodtype, 
//         info.primary_contact, info.secondary_contact, info.medical_insurance, info.dental_insurance, info.birthday, info.allergy_notes], (err, rows, fields)=>{
//         if(err)
//         {
//             console.log(err);
//         }
//         else 
//         {
//             res.send({
//                 passed: true,
//             });
//         }    
//     })
// });

// //health-card condition
// app.get('/usercondition/:userId/', (req, res) => {
//     mysqlConnection.query('SELECT * FROM usercondition where userId = ?', [req.params.userId], (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// app.delete('/usercondition/:id/', (req, res) => {
//     mysqlConnection.query('DELETE FROM usercondition where id = ?', [req.params.id], (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// app.put('/usercondition/', function(req, res){
//     let info = req.body;
//     var sql = "SET @id = ?; SET @userId = ?; SET @condition_name=?; SET @condition_notes=?;\
//     CALL UserconditionAddOrEdit(@id, @userId, @condition_name, @condition_notes);";
//     mysqlConnection.query(sql, [info.id, info.userId, info.condition_name, info.condition_notes], (err, rows, fields)=>{
//         if(err){
//             console.log(err);
//         }
//         else 
//         {
//             res.send(rows);
//         }    
//     })
// });



// //health-card medication
// app.get('/usermedication/:userId/', checkToken, (req, res) => {

//     jwt.verify(req.token, 'jk23!+!97', (err, rows) => {
//         if(err){
//             console.log('ERROR: Could not connect to the protected route');
//             res.sendStatus(403);
//         }
//         else{
//             mysqlConnection.query('SELECT * FROM usermedication where userId = ?', [req.params.userId], (err, rows, fields)=>{
//                 if(!err)
//                     res.send(rows);
//                 else
//                     console.log(err);
//             })
//         }
//     })
// });

// app.delete('/usermedication/:id/', (req, res) => {
//     mysqlConnection.query('DELETE FROM usermedication where id = ?', [req.params.id], (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// app.put('/usermedication/', function(req, res){
//     let info = req.body;
//     var sql = "SET @id = ?; SET @userId = ?; SET @medication_name=?; SET @medication_notes=?;\
//     CALL UsermedicationAddOrEdit(@id, @userId, @medication_name, @medication_notes);";
//     mysqlConnection.query(sql, [info.id, info.userId, info.medication_name, info.medication_notes], (err, rows, fields)=>{
//         if(err){
//             console.log(err);
//         }
//         else 
//         {
//             res.send(rows);
//         }    
//     })
// });

// //health education page

//GET education tabs info
// app.get('/educationtabs', (req, res) => {
//     mysqlConnection.query('SELECT educationtabs.tab_title, educationtabs.tab_description,  tabvideos.vidSection\
//   FROM educationtabs \
//       LEFT JOIN ( SELECT tab_id, JSON_ARRAYAGG(JSON_OBJECT("vid_title", vid_title, "vid_description", vid_description, "vid_link", vid_link)) vidSection FROM tabvideos GROUP BY tab_id\
//       ) tabvideos ON tabvideos.tab_id = educationtabs.tab_id', (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// ///health-log page

// //GET
// app.get('/log/:userId/', (req, res) => {
//     mysqlConnection.query('SELECT * FROM log where userId = ?', [req.params.userId], (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// //ADD or UPDATE
// app.put('/log/', function(req, res){
//     let info = req.body;
//     var sql = "SET @id = ?; SET @userId = ?; SET @startTime=?; SET @endTime=?;\
//     SET @allDay=?;SET @isInsulin=?;SET @isBP=?;SET @isBG=?;\
//     SET @insulinValue=?;SET @BPValue=?;SET @BGValue=?;\
//     CALL LogAddOrEdit(@id, @userId, @startTime, @endTime, @allDay,  @isInsulin, @isBP, @isBG, @insulinValue, @BPValue, @BGValue);";
//     mysqlConnection.query(sql, [info.id, info.userId, info.startTime, info.endTime, info.allDay, info.isInsulin, info.isBP, info.isBG, info.insulinValue, info.BPValue, info.BGValue], (err, rows, fields)=>{
//         if(err){
//             console.log(err);
//         }
//         else 
//         {
//             res.send(rows);
//         }    
//     })
// });

// //DELETE ??
// app.delete('/log/:id/', (req, res) => {
//     mysqlConnection.query('DELETE FROM log where id = ?', [req.params.id], (err, rows, fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });
