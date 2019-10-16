const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oliverkahn',
    database: 'healthcareapp',
    multipleStatements: true
});

// exports.createUser = (req, res, next) => {
//     let user = req.body;
//     var sql = "INSERT INTO usercredentials(username, password) VALUES (?, ?);"
//     mysqlConnection.query(sql, [user.username, user.password], (err, rows, fields)=>{
//         if(!err)
//             res.send('Insert successful!');
//         else
//             console.log(err);
//     })
// }


exports.loginUser = (req, res) => {

    let user = req.body;
    var sql = "SELECT * FROM usercredentials WHERE username = ? AND password = ?;"
    mysqlConnection.query(sql, [user.username, user.password], function(err, rows){
        if(err){
            console.log("000Inside loginUser - got error while getting user data frm DB. Error:" + err);          
        }
        else{
            console.log("111Inside exports.loginUser - going to get user credentional frm DB & than going to generate token");
            const id = rows[0].id;
            // const user = {
            //     id: rows[0].id,
            //     username: rows[0].username,
            //     password: rows[0].password
            // }
            // to generate the new token & send it
            let token = jwt.sign({id}, 'jk23!+!97', {expiresIn: '1h'});
            res.status(200).send({token});
        }
    })
}

exports.addEvent = (req, res, next) => {
    //res.send('akshat3');
    let event = req.body;
    var sql = "INSERT INTO appointment(userId, title, description, startTime, endTime, location, isMedication) VALUES(?, ?, ?, ?, ?, ?, ?);"
    mysqlConnection.query(sql, [event.userId, event.title, event.description, event.startTime, event.endTime, event.location, event.isMedication], (err, rows, fields)=>{
        if(!err)
            console.log('Event inserted succesfully');
        else
            console.log(err);
    });
}

exports.getUserHealth = (req, res, next) => {
    const header = req.headers['authorization'];
    const bearer = header.split(' ');
    const token = bearer[1];
    var payload = jwt.verify(token, 'jk23!+!97');
    mysqlConnection.query('SELECT * FROM userhealth where userId = ?', payload.id, (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
}

exports.checkToken = (req, res, next) => {
     const header = req.headers['authorization'];
    console.log(header);
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}