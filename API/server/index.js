// var express = require('express');
// var bodyParser = require('body-parser');
// // var logger = require('morgan');
// var methodOverride = require('method-override')
// var cors = require('cors');
// var mysql = require('mysql');

// var app = express();
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(cors());

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(cors());

const user = require('./routes/userRoute');

app.use(user);


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'healthcareapp',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('connected!');
    else
        console.log('Failed ' + JSON.stringify(err, undefined, 2))
});

app.listen(3000, ()=>console.log('Express running at 3000!'));


//health-card information

app.get('/userhealth/:userId/', (req, res) => {
    console.log('akshat');
    mysqlConnection.query('SELECT * FROM userhealth where userId = ?', [req.params.userId], (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

app.put('/userhealth/', function(req, res){
    let info = req.body;
    var sql = "SET @userId = ?; SET @height_feet=?; SET @height_inches=?; SET @weight=?; SET @bloodtype = ?; SET @primary_contact=?; SET @secondary_contact=?; SET @medical_insurance=?; SET @dental_insurance = ?; SET @birthday=?; SET @allergy_notes=?;\
    CALL UserhealthAddOrEdit(@userId, @height_feet, @height_inches, @weight, @bloodtype, @primary_contact, @secondary_contact, @medical_insurance, @dental_insurance, @birthday, @allergy_notes);";
    mysqlConnection.query(sql, [info.userId, info.height_feet, info.height_inches, info.weight, info.bloodtype, 
        info.primary_contact, info.secondary_contact, info.medical_insurance, info.dental_insurance, info.birthday, info.allergy_notes], (err, rows, fields)=>{
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.send({
                passed: true,
            });
        }    
    })
});

//health-card condition
app.get('/usercondition/:userId/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usercondition where userId = ?', [req.params.userId], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/usercondition/:id/', (req, res) => {
    mysqlConnection.query('DELETE FROM usercondition where id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.put('/usercondition/', function(req, res){
    let info = req.body;
    var sql = "SET @id = ?; SET @userId = ?; SET @condition_name=?; SET @condition_notes=?;\
    CALL UserconditionAddOrEdit(@id, @userId, @condition_name, @condition_notes);";
    mysqlConnection.query(sql, [info.id, info.userId, info.condition_name, info.condition_notes], (err, rows, fields)=>{
        if(err){
            console.log(err);
        }
        else 
        {
            res.send(rows);
        }    
    })
});

//health-card medication
app.get('/usermedication/:userId/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usermedication where userId = ?', [req.params.userId], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/usermedication/:id/', (req, res) => {
    mysqlConnection.query('DELETE FROM usermedication where id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.put('/usermedication/', function(req, res){
    let info = req.body;
    var sql = "SET @id = ?; SET @userId = ?; SET @medication_name=?; SET @medication_notes=?;\
    CALL UsermedicationAddOrEdit(@id, @userId, @medication_name, @medication_notes);";
    mysqlConnection.query(sql, [info.id, info.userId, info.medication_name, info.medication_notes], (err, rows, fields)=>{
        if(err){
            console.log(err);
        }
        else 
        {
            res.send(rows);
        }    
    })
});

//health education page

//GET education tabs info
app.get('/educationtabs', (req, res) => {
    mysqlConnection.query('SELECT educationtabs.tab_title, educationtabs.tab_description,  tabvideos.vidSection\
  FROM educationtabs \
      LEFT JOIN ( SELECT tab_id, JSON_ARRAYAGG(JSON_OBJECT("vid_title", vid_title, "vid_description", vid_description, "vid_link", vid_link)) vidSection FROM tabvideos GROUP BY tab_id\
      ) tabvideos ON tabvideos.tab_id = educationtabs.tab_id', (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

///health-log page

//GET
app.get('/log/:userId/', (req, res) => {
    mysqlConnection.query('SELECT * FROM log where userId = ?', [req.params.userId], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//ADD or UPDATE
app.put('/log/', function(req, res){
    let info = req.body;
    var sql = "SET @id = ?; SET @userId = ?; SET @startTime=?; SET @endTime=?;\
    SET @allDay=?;SET @isInsulin=?;SET @isBP=?;SET @isBG=?;\
    SET @insulinValue=?;SET @BPValue=?;SET @BGValue=?;\
    CALL LogAddOrEdit(@id, @userId, @startTime, @endTime, @allDay,  @isInsulin, @isBP, @isBG, @insulinValue, @BPValue, @BGValue);";
    mysqlConnection.query(sql, [info.id, info.userId, info.startTime, info.endTime, info.allDay, info.isInsulin, info.isBP, info.isBG, info.insulinValue, info.BPValue, info.BGValue], (err, rows, fields)=>{
        if(err){
            console.log(err);
        }
        else 
        {
            res.send(rows);
        }    
    })
});

//DELETE ??
app.delete('/log/:id/', (req, res) => {
    mysqlConnection.query('DELETE FROM log where id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});
