const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getResources = (req, res, next) => {
  mysqlConnection.query(
    'SELECT categories.category_id, \
    JSON_ARRAYAGG(JSON_OBJECT("resource_title", resource_title, \
    "resource_description", resource_description, \
    "all_details",  JSON_OBJECT("state", state, "city", city)) ) all_resources \
    FROM categories, resources, resource_details \
    WHERE categories.category_id = resources.category_id \
    AND resource_details.resource_id = resources.resource_id \
    GROUP BY categories.category_id',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
