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
    database: 'test',
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if(!err)
        console.log('connected!');
    else
        console.log('Failed ' + JSON.stringify(err, undefined, 2))
});

app.listen(3000, ()=>console.log('Express running at 3000!'));

//GET ALL EMPLOYEES
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields)=>{
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
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted  ID: ' + element[0].id);
            });
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
});