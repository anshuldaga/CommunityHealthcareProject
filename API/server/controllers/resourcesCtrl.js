const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getResources = (req, res, next) => {
  mysqlConnection.query(
    'SELECT categories.category_title, resources.all_details\
    FROM categories \
        LEFT JOIN ( SELECT category_id, JSON_ARRAYAGG(JSON_OBJECT("resource_title", resource_title, "resource_description", resource_description)) all_details FROM resources GROUP BY category_id\
        ) resources ON resources.category_id = categories.category_id',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
