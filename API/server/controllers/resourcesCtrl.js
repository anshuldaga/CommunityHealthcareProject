const mysql = require('mysql');
const jwt = require('jsonwebtoken');


var mysqlConnection = require('../mysqlConnection');


exports.getResources = (req, res, next) => {
  mysqlConnection.query(
    'SELECT categories.category_title, tmp.all_resources\
      FROM categories \
          LEFT JOIN ( (SELECT category_id, resource_details.all_listings,\
             JSON_ARRAYAGG(JSON_OBJECT("resource_title", \
            resource_title, "resource_description", resource_description)) all_resources \
            FROM resources\
            	\
            	LEFT JOIN ( SELECT resource_id, \
	             JSON_ARRAYAGG(JSON_OBJECT("state", \
	            state)) all_listings \
	            FROM resource_details\
	            GROUP BY resource_id\
	         	) resource_details ON resource_details.resource_id = resources.resource_id) tmp\
	         	\
            GROUP BY category_id\
          ) tmp ON tmp.category_id = categories.category_id',

    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
