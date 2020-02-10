const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getResources = (req, res, next) => {
  mysqlConnection.query(
    'SELECT categories.category_title, resources.resource_title\
      FROM categories \
          LEFT JOIN ( SELECT tab_id, JSON_ARRAYAGG(JSON_OBJECT("vid_title", vid_title, "vid_description", vid_description, "vid_link", vid_link)) vidSection FROM tabvideos GROUP BY tab_id\
          ) tabvideos ON tabvideos.tab_id = educationtabs.tab_id',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
