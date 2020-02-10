const express = require('express');
const cors = require('cors');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(cors());

const user = require('./routes/userRoute'); //user -> router
const userHealth = require('./routes/userHealthRoute'); //user -> router
const userCondition = require('./routes/userConditionRoute'); //user -> router
const userMedication = require('./routes/userMedicationRoute'); //user -> router
const educationTabs = require('./routes/educationTabsRoute'); //user -> router
const log = require('./routes/logRoute'); //user -> router
const medlog = require('./routes/medLogRoute'); //user -> router
const medNames = require('./routes/medNamesRoute'); //user -> router
const resources = require('./routes/resourcesRoute'); //user -> router

app.use(user); //router
app.use(userHealth); //router
app.use(resources); //router
app.use(userCondition); //router
app.use(userMedication); //router
app.use(educationTabs); //router
app.use(log); //router
app.use(medlog); //router
app.use(medNames); //router


var mysqlConnection = require('./mysqlConnection');


mysqlConnection.connect(err => {
  if (!err) console.log('connected!');
  else console.log('Failed ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express running at 3000!'));

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

