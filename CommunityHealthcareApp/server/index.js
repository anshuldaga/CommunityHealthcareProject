var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var mysql = require('mysql');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('connected!');
    else
        console.log('Failed ' + JSON.stringify(err, undefined, 2))
});

app.listen(process.env.PORT || 3000);

//health-card information

app.get('/userhealth/:userId/', (req, res) => {
    mysqlConnection.query('SELECT * FROM userhealth where userId = ?', [req.params.userId], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
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


//GET ALL EMPLOYEES
/*app.get('/educationtab', (req, res) => {
    mysqlConnection.query('SELECT * FROM educationtab', (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//GET EMPLOYEE ID - 1
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee where id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});



//DELETE EMPLOYEE ID
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee where id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send('Delete successful!');
        else
            console.log(err);
    })
});



//POST EMPLOYEE ID
app.post('/employees/', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?; SET @name=?; SET @salary=?; SET @number=?;\
    CALL EmployeeAddOrEdit(@id, @name, @salary, @number);";
    mysqlConnection.query(sql, [emp.id, emp.name, emp.salary, emp.number], (err, rows, fields)=>{
        if(!err)
            res.send('Updated Successfully!');
        else
            console.log(err);
    })

});

//UPDATE EMPLOYEE ID
app.put('/employees/', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?; SET @name=?; SET @salary=?; SET @number=?;\
    CALL EmployeeAddOrEdit(@id, @name, @salary, @number);";
    mysqlConnection.query(sql, [emp.id, emp.name, emp.salary, emp.number], (err, rows, fields)=>{
        if(!err)
            res.send('Updated Successfully!');
        else
            console.log(err);
    })
});*/