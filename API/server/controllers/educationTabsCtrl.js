const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyCubical@11',
  database: 'healthcareapp',
  multipleStatements: true
});

exports.getEducationTabs = (req, res, next) => {
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
};
